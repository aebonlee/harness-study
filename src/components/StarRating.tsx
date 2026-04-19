import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';
import type { ReactElement } from 'react';

interface StarRatingProps {
  pageId: string;
}

export default function StarRating({ pageId }: StarRatingProps): ReactElement {
  const { language } = useLanguage();
  const { user, isLoggedIn } = useAuth();
  const isKo = language === 'ko';

  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchRatings();
  }, [pageId]);

  useEffect(() => {
    if (isLoggedIn && user) fetchMyRating();
  }, [isLoggedIn, user, pageId]);

  async function fetchRatings() {
    const { data } = await supabase
      .from('hs_ratings')
      .select('score')
      .eq('page_id', pageId);
    if (data && data.length > 0) {
      const total = data.reduce((sum: number, r: { score: number }) => sum + r.score, 0);
      setAvg(Math.round((total / data.length) * 10) / 10);
      setCount(data.length);
    }
  }

  async function fetchMyRating() {
    if (!user) return;
    const { data } = await supabase
      .from('hs_ratings')
      .select('score')
      .eq('page_id', pageId)
      .eq('user_id', user.id)
      .maybeSingle();
    if (data) {
      setMyScore(data.score);
      setSubmitted(true);
    }
  }

  async function handleRate(score: number) {
    if (!isLoggedIn || !user) return;
    const { error } = await supabase
      .from('hs_ratings')
      .upsert(
        { user_id: user.id, page_id: pageId, score },
        { onConflict: 'user_id,page_id' }
      );
    if (!error) {
      setMyScore(score);
      setSubmitted(true);
      fetchRatings();
    }
  }

  return (
    <div className="star-rating-section">
      <h3 className="star-rating-title">
        <i className="fa-solid fa-star" />
        {isKo ? '이 가이드가 도움이 되었나요?' : 'Was this guide helpful?'}
      </h3>
      <div className="star-rating-display">
        <div className="star-rating-avg">
          <span className="star-rating-avg-num">{avg > 0 ? avg.toFixed(1) : '-'}</span>
          <span className="star-rating-avg-max">/ 5</span>
        </div>
        <div className="star-rating-count">
          ({count}{isKo ? '명 참여' : ' ratings'})
        </div>
      </div>
      {isLoggedIn ? (
        <div className="star-rating-input">
          <div className="star-rating-stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                className={`star-btn ${s <= (hover || myScore) ? 'active' : ''}`}
                onClick={() => handleRate(s)}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
              >
                <i className={`fa-${s <= (hover || myScore) ? 'solid' : 'regular'} fa-star`} />
              </button>
            ))}
          </div>
          {submitted && (
            <div className="star-rating-thanks">
              <i className="fa-solid fa-check-circle" />
              {isKo ? '평가해주셔서 감사합니다!' : 'Thanks for your rating!'}
            </div>
          )}
        </div>
      ) : (
        <p className="star-rating-login-hint">
          <i className="fa-solid fa-lock" />
          {isKo ? '로그인하면 평가에 참여할 수 있습니다.' : 'Log in to submit your rating.'}
        </p>
      )}
    </div>
  );
}
