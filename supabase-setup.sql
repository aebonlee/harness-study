-- ============================================
-- Harness Master - Supabase Setup SQL
-- Table Prefix: hs_ (harness-study)
-- Project: hcmgdztsgjvzcyxyayaj.supabase.co
-- Created: 2026-04-19
-- ============================================

-- ---- Extensions ----
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- ============================================
-- 1. USER PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS hs_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',           -- 'google' | 'kakao' | 'email'
  role TEXT DEFAULT 'user',                -- 'user' | 'admin'

  -- Progress
  current_path TEXT DEFAULT 'intro',       -- current learning path
  completed_paths TEXT[] DEFAULT '{}',     -- array of completed paths
  completed_sections TEXT[] DEFAULT '{}',  -- format: 'path:section'
  total_study_minutes INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_study_date DATE,

  -- Preferences
  preferred_theme TEXT DEFAULT 'dark',     -- 'light' | 'dark'
  preferred_color TEXT DEFAULT 'harness',  -- color theme
  preferred_lang TEXT DEFAULT 'ko',        -- 'ko' | 'en'
  notifications_enabled BOOLEAN DEFAULT TRUE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- Trigger: Auto-update updated_at ----
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER hs_profiles_updated_at
  BEFORE UPDATE ON hs_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---- Trigger: Auto-create profile on signup ----
CREATE OR REPLACE FUNCTION hs_handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO hs_profiles (id, email, display_name, avatar_url, provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture'),
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION hs_handle_new_user();

-- ============================================
-- 2. LEARNING PROGRESS
-- ============================================
CREATE TABLE IF NOT EXISTS hs_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES hs_profiles(id) ON DELETE CASCADE,

  path_id TEXT NOT NULL,                   -- 'intro' | 'agents' | 'patterns' | 'skills' | 'teams' | 'memory' | 'practice'
  section_id TEXT NOT NULL,               -- section slug (e.g., 'overview', 'concept')
  is_completed BOOLEAN DEFAULT FALSE,
  completion_rate INTEGER DEFAULT 0,       -- 0-100
  study_minutes INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, path_id, section_id)
);

CREATE TRIGGER hs_progress_updated_at
  BEFORE UPDATE ON hs_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. BOOKMARKS / NOTES
-- ============================================
CREATE TABLE IF NOT EXISTS hs_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES hs_profiles(id) ON DELETE CASCADE,

  path_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  title TEXT NOT NULL,
  note TEXT,                               -- user's personal note
  tags TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER hs_bookmarks_updated_at
  BEFORE UPDATE ON hs_bookmarks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. QUIZ / PRACTICE RESULTS
-- ============================================
CREATE TABLE IF NOT EXISTS hs_quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES hs_profiles(id) ON DELETE CASCADE,

  path_id TEXT NOT NULL,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,        -- 0-100
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  time_taken_seconds INTEGER DEFAULT 0,
  answers JSONB DEFAULT '{}',              -- { question_id: answer }

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. COMMENTS / DISCUSSIONS
-- ============================================
CREATE TABLE IF NOT EXISTS hs_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES hs_profiles(id) ON DELETE CASCADE,

  path_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES hs_comments(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER hs_comments_updated_at
  BEFORE UPDATE ON hs_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. ANNOUNCEMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS hs_announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'info',                -- 'info' | 'warning' | 'update' | 'event'
  is_active BOOLEAN DEFAULT TRUE,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_hs_progress_user ON hs_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_hs_progress_path ON hs_progress(path_id);
CREATE INDEX IF NOT EXISTS idx_hs_progress_user_path ON hs_progress(user_id, path_id);
CREATE INDEX IF NOT EXISTS idx_hs_bookmarks_user ON hs_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_hs_quiz_user ON hs_quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_hs_comments_path ON hs_comments(path_id, section_id);
CREATE INDEX IF NOT EXISTS idx_hs_comments_user ON hs_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_hs_announcements_active ON hs_announcements(is_active, starts_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Profiles
ALTER TABLE hs_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON hs_profiles FOR SELECT USING (TRUE);

CREATE POLICY "Users can update their own profile"
  ON hs_profiles FOR UPDATE USING (auth.uid() = id);

-- Progress
ALTER TABLE hs_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress"
  ON hs_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON hs_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON hs_progress FOR UPDATE USING (auth.uid() = user_id);

-- Bookmarks
ALTER TABLE hs_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON hs_bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks"
  ON hs_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookmarks"
  ON hs_bookmarks FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON hs_bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Quiz Results
ALTER TABLE hs_quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz results"
  ON hs_quiz_results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results"
  ON hs_quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Comments
ALTER TABLE hs_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
  ON hs_comments FOR SELECT USING (is_hidden = FALSE);

CREATE POLICY "Authenticated users can insert comments"
  ON hs_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON hs_comments FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON hs_comments FOR DELETE USING (auth.uid() = user_id);

-- Announcements (Read-only for users)
ALTER TABLE hs_announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active announcements are viewable by everyone"
  ON hs_announcements FOR SELECT USING (is_active = TRUE);

-- ============================================
-- SAMPLE DATA
-- ============================================
INSERT INTO hs_announcements (title, content, type) VALUES
  ('Harness Master 베타 오픈!', 'Claude Code 하네스 학습 사이트가 오픈했습니다. 6가지 아키텍처 패턴을 마스터해보세요.', 'update'),
  ('학습 경로 7개 완성', '소개부터 실전 프로젝트까지 7개 완전한 학습 경로가 준비되어 있습니다.', 'info')
ON CONFLICT DO NOTHING;

-- ============================================
-- END OF SETUP
-- ============================================
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hcmgdztsgjvzcyxyayaj/sql
-- ============================================
