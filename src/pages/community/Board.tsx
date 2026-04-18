import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

/*
  Supabase table: hs_board
  CREATE TABLE hs_board (
    id          bigserial PRIMARY KEY,
    user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email  text NOT NULL,
    title       text NOT NULL,
    content     text NOT NULL,
    views       integer DEFAULT 0,
    created_at  timestamptz DEFAULT now()
  );
  ALTER TABLE hs_board ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "anyone can read" ON hs_board FOR SELECT USING (true);
  CREATE POLICY "auth insert" ON hs_board FOR INSERT WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "auth delete own" ON hs_board FOR DELETE USING (auth.uid() = user_id);
  CREATE POLICY "update views" ON hs_board FOR UPDATE USING (true) WITH CHECK (true);
*/

interface BoardPost {
  id: number;
  user_id: string;
  user_email: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
}

function timeAgo(dateStr: string, isKo: boolean): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60)    return isKo ? '방금 전' : 'just now';
  if (diff < 3600)  return isKo ? `${Math.floor(diff / 60)}분 전`     : `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return isKo ? `${Math.floor(diff / 3600)}시간 전`  : `${Math.floor(diff / 3600)}h ago`;
  return isKo ? `${Math.floor(diff / 86400)}일 전` : `${Math.floor(diff / 86400)}d ago`;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local.slice(0, 2)}***@${domain}`;
}

export default function Board(): ReactElement {
  const { language } = useLanguage();
  const { isLoggedIn, user } = useAuth();
  const isKo = language === 'ko';

  const [posts,      setPosts]      = useState<BoardPost[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [title,      setTitle]      = useState('');
  const [content,    setContent]    = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from('hs_board')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data as BoardPost[]);
    setLoading(false);
  }

  async function handleExpand(post: BoardPost) {
    if (expandedId === post.id) { setExpandedId(null); return; }
    setExpandedId(post.id);
    await supabase.from('hs_board').update({ views: post.views + 1 }).eq('id', post.id);
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    setError('');
    const { error: err } = await supabase.from('hs_board').insert({
      user_id: user!.id,
      user_email: user!.email ?? 'unknown',
      title: title.trim(),
      content: content.trim(),
    });
    if (err) {
      setError(isKo ? '등록 중 오류가 발생했습니다.' : 'An error occurred while submitting.');
    } else {
      setTitle(''); setContent(''); setShowForm(false);
      fetchPosts();
    }
    setSubmitting(false);
  }

  async function handleDelete(id: number) {
    if (!confirm(isKo ? '삭제하시겠습니까?' : 'Delete this post?')) return;
    await supabase.from('hs_board').delete().eq('id', id);
    fetchPosts();
  }

  return (
    <>
      <SEOHead
        title={isKo ? '자유게시판 | Harness Master' : 'Free Board | Harness Master'}
        description={isKo ? 'Harness Master 커뮤니티 자유게시판. 스킬 공유, 경험담, 질문을 자유롭게 올려보세요.' : 'Harness Master community free board. Share skills, experiences, and questions freely.'}
        path="/community/board"
      />
      <div className="community-page">
        <div className="community-header">
          <div className="guide-hero-badge" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <i className="fa-solid fa-chalkboard" />
            {isKo ? '자유게시판' : 'Free Board'}
          </div>
          <h1 className="community-title">{isKo ? '자유게시판' : 'Free Board'}</h1>
          <p className="community-desc">
            {isKo
              ? '스킬 공유, 사용 후기, 아이디어, 질문 등 자유롭게 올려주세요.'
              : 'Post freely — skill sharing, reviews, ideas, questions, and more.'}
          </p>
        </div>

        {/* Toolbar */}
        <div className="community-toolbar">
          <span className="community-count">
            {isKo ? `전체 ${posts.length}개` : `${posts.length} posts`}
          </span>
          {isLoggedIn ? (
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
              <i className="fa-solid fa-pen" />
              {isKo ? '글쓰기' : 'Write Post'}
            </button>
          ) : (
            <span className="community-login-hint">
              <i className="fa-solid fa-lock" />
              {isKo ? '로그인 후 글을 작성할 수 있습니다' : 'Login to write a post'}
            </span>
          )}
        </div>

        {/* Write Form */}
        {showForm && (
          <form className="community-form" onSubmit={handleSubmit}>
            <h3 className="community-form-title">{isKo ? '새 글 작성' : 'New Post'}</h3>
            <div className="community-form-field">
              <label>{isKo ? '제목' : 'Title'}</label>
              <input
                type="text"
                className="community-input"
                placeholder={isKo ? '제목을 입력하세요' : 'Enter title'}
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={100}
                required
              />
            </div>
            <div className="community-form-field">
              <label>{isKo ? '내용' : 'Content'}</label>
              <textarea
                className="community-textarea"
                placeholder={isKo ? '내용을 입력하세요' : 'Enter content'}
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={5}
                required
              />
            </div>
            {error && <p className="community-error">{error}</p>}
            <div className="community-form-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>
                {isKo ? '취소' : 'Cancel'}
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
                {submitting ? (isKo ? '등록 중...' : 'Submitting...') : (isKo ? '등록' : 'Submit')}
              </button>
            </div>
          </form>
        )}

        {/* Posts */}
        {loading ? (
          <div className="community-loading">
            <div className="loading-spinner" />
          </div>
        ) : posts.length === 0 ? (
          <div className="community-empty">
            <i className="fa-solid fa-chalkboard" />
            <p>{isKo ? '아직 게시물이 없습니다. 첫 번째 글을 작성해보세요!' : 'No posts yet. Be the first to write!'}</p>
          </div>
        ) : (
          <div className="post-list">
            {posts.map((post, idx) => (
              <div key={post.id} className={`post-card ${expandedId === post.id ? 'expanded' : ''}`}>
                <div className="post-card-header" onClick={() => handleExpand(post)}>
                  <div className="post-card-main">
                    <span className="post-number">{posts.length - idx}</span>
                    <h3 className="post-title">{post.title}</h3>
                    <div className="post-meta">
                      <span><i className="fa-solid fa-user" />{maskEmail(post.user_email)}</span>
                      <span><i className="fa-solid fa-clock" />{timeAgo(post.created_at, isKo)}</span>
                      <span><i className="fa-solid fa-eye" />{post.views}</span>
                    </div>
                  </div>
                  <i className={`fa-solid fa-chevron-${expandedId === post.id ? 'up' : 'down'} post-chevron`} />
                </div>
                {expandedId === post.id && (
                  <div className="post-card-body">
                    <div className="post-content">{post.content}</div>
                    {isLoggedIn && user?.id === post.user_id && (
                      <div className="post-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(post.id)}>
                          <i className="fa-solid fa-trash" />
                          {isKo ? '삭제' : 'Delete'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
