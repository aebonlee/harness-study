import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import { useIdleTimeout } from '../hooks/useIdleTimeout';
import ProfileCompleteModal from '../components/ProfileCompleteModal';
import PaymentNudgePopup from '../components/PaymentNudgePopup';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithKakao: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = () => setAuthError(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      if (session) setAuthError(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        setAuthError(error.message);
        setIsLoading(false);
      }
    } catch {
      setAuthError('Google 로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const signInWithKakao = async () => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        setAuthError(error.message);
        setIsLoading(false);
      }
    } catch {
      setAuthError('카카오 로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const [_userProfile, _setUserProfile] = useState<any>(null);
  const _loadUserProfile = useCallback(async (uid: string) => {
    try {
      const { data } = await supabase.from('user_profiles').select('name,phone').eq('id', uid).maybeSingle();
      _setUserProfile(data);
    } catch { _setUserProfile(null); }
  }, []);

  useEffect(() => {
    if (user) _loadUserProfile(user.id);
  }, [user, _loadUserProfile]);

  const refreshProfile = useCallback(async () => {
    if (user) await _loadUserProfile(user.id);
  }, [user, _loadUserProfile]);

  const isLoggedIn = !!user;
  const needsProfileCompletion = isLoggedIn && !!_userProfile && !_userProfile.name;

  useIdleTimeout({
    enabled: isLoggedIn,
    onTimeout: () => { supabase.auth.signOut(); },
  });

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoggedIn,
      isLoading,
      authError,
      clearAuthError,
      signInWithGoogle,
      signInWithKakao,
      signOut,
    }}>
      {children}
      {needsProfileCompletion && user && (
        <ProfileCompleteModal user={user} onComplete={refreshProfile} />
      )}
      {isLoggedIn && user && !needsProfileCompletion && (
        <PaymentNudgePopup user={user} siteSlug="harness-study" />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
