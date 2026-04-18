import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

/*
  Supabase table: hs_qna
  CREATE TABLE hs_qna (
    id          bigserial PRIMARY KEY,
    user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email  text NOT NULL,
    title       text NOT NULL,
    content     text NOT NULL,
    answer      text,
    created_at  timestamptz DEFAULT now()
  );
  ALTER TABLE hs_qna ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "anyone can read" ON hs_qna FOR SELECT USING (true);
  CREATE POLICY "auth insert" ON hs_qna FOR INSERT WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "auth delete own" ON hs_qna FOR DELETE USING (auth.uid() = user_id);
*/

interface QnaPost {
  id: number;
  user_id: string;
  user_email: string;
  title: string;
  content: string;
  answer: string | null;
  created_at: string;
}

function timeAgo(dateStr: string, isKo: boolean): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60)   return isKo ? '방금 전' : 'just now';
  if (diff < 3600) return isKo ? `${Math.floor(diff / 60)}분 전` : `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return isKo ? `${Math.floor(diff / 3600)}시간 전` : `${Math.floor(diff / 3600)}h ago`;
  return isKo ? `${Math.floor(diff / 86400)}일 전` : `${Math.floor(diff / 86400)}d ago`;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local.slice(0, 2)}***@${domain}`;
}

export default function QnA(): ReactElement {
  const { language } = useLanguage();
  const { isLoggedIn, user } = useAuth();
  const isKo = language === 'ko';

  const [posts,      setPosts]      = useState<QnaPost[]>([]);
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
      .from('hs_qna')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data as QnaPost[]);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    setError('');
    const { error: err } = await supabase.from('hs_qna').insert({
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
    await supabase.from('hs_qna').delete().eq('id', id);
    fetchPosts();
  }

  return (
    <>
      <SEOHead
        title={isKo ? 'Q&A | Harness Master' : 'Q&A | Harness Master'}
        description={isKo ? 'Harness 학습 중 궁금한 점을 질문하고 답변을 받아보세요.' : 'Ask questions about Harness learning and get answers from the community.'}
        path="/community/qna"
      />
      <div className="community-page">
        <div className="community-header">
          <div className="guide-hero-badge" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <i className="fa-solid fa-comments" />
            Q&A
          </div>
          <h1 className="community-title">{isKo ? '질문 & 답변' : 'Questions & Answers'}</h1>
          <p className="community-desc">
            {isKo
              ? 'Harness 학습 중 궁금한 점을 자유롭게 질문하세요.'
              : 'Ask freely about anything you are curious about while learning Harness.'}
          </p>
        </div>

        {/* Write Button */}
        <div className="community-toolbar">
          <span className="community-count">
            {isKo ? `전체 ${posts.length}개` : `${posts.length} posts`}
          </span>
          {isLoggedIn ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowForm(!showForm)}
            >
              <i className="fa-solid fa-pen" />
              {isKo ? '질문하기' : 'Ask Question'}
            </button>
          ) : (
            <span className="community-login-hint">
              <i className="fa-solid fa-lock" />
              {isKo ? '로그인 후 질문할 수 있습니다' : 'Login to ask a question'}
            </span>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <form className="community-form" onSubmit={handleSubmit}>
            <h3 className="community-form-title">{isKo ? '새 질문 작성' : 'New Question'}</h3>
            <div className="community-form-field">
              <label>{isKo ? '제목' : 'Title'}</label>
              <input
                type="text"
                className="community-input"
                placeholder={isKo ? '질문 제목을 입력하세요' : 'Enter question title'}
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
                placeholder={isKo ? '질문 내용을 자세히 입력하세요' : 'Describe your question in detail'}
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
                {submitting ? (isKo ? '등록 중...' : 'Submitting...') : (isKo ? '질문 등록' : 'Submit')}
              </button>
            </div>
          </form>
        )}

        {/* Posts List */}
        {loading ? (
          <div className="community-loading">
            <div className="loading-spinner" />
          </div>
        ) : posts.length === 0 ? (
          <div className="community-empty">
            <i className="fa-solid fa-comments" />
            <p>{isKo ? '아직 질문이 없습니다. 첫 번째 질문을 남겨보세요!' : 'No questions yet. Be the first to ask!'}</p>
          </div>
        ) : (
          <div className="post-list">
            {posts.map(post => (
              <div key={post.id} className={`post-card ${expandedId === post.id ? 'expanded' : ''}`}>
                <div className="post-card-header" onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}>
                  <div className="post-card-main">
                    <div className="post-badges">
                      {post.answer
                        ? <span className="post-badge answered">{isKo ? '답변완료' : 'Answered'}</span>
                        : <span className="post-badge unanswered">{isKo ? '답변대기' : 'Pending'}</span>}
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <div className="post-meta">
                      <span><i className="fa-solid fa-user" />{maskEmail(post.user_email)}</span>
                      <span><i className="fa-solid fa-clock" />{timeAgo(post.created_at, isKo)}</span>
                    </div>
                  </div>
                  <i className={`fa-solid fa-chevron-${expandedId === post.id ? 'up' : 'down'} post-chevron`} />
                </div>
                {expandedId === post.id && (
                  <div className="post-card-body">
                    <div className="post-content">{post.content}</div>
                    {post.answer && (
                      <div className="post-answer">
                        <div className="post-answer-label">
                          <i className="fa-solid fa-circle-check" />
                          {isKo ? '답변' : 'Answer'}
                        </div>
                        <div className="post-answer-content">{post.answer}</div>
                      </div>
                    )}
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
