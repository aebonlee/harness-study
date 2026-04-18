-- ============================================
-- Harness Master - Supabase Setup SQL
-- Table Prefix: hs_ (harness-study)
-- Project: hcmgdztsgjvzcyxyayaj.supabase.co
-- Updated: 2026-04-19 (idempotent - safe to re-run)
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. hs_profiles
-- ============================================
CREATE TABLE IF NOT EXISTS hs_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  role TEXT DEFAULT 'user',
  current_path TEXT DEFAULT 'intro',
  completed_paths TEXT[] DEFAULT '{}',
  completed_sections TEXT[] DEFAULT '{}',
  total_study_minutes INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_study_date DATE,
  preferred_theme TEXT DEFAULT 'dark',
  preferred_color TEXT DEFAULT 'harness',
  preferred_lang TEXT DEFAULT 'ko',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS hs_profiles_updated_at ON hs_profiles;
CREATE TRIGGER hs_profiles_updated_at
  BEFORE UPDATE ON hs_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

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
-- 2. hs_progress
-- ============================================
CREATE TABLE IF NOT EXISTS hs_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES hs_profiles(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completion_rate INTEGER DEFAULT 0,
  study_minutes INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, path_id, section_id)
);

DROP TRIGGER IF EXISTS hs_progress_updated_at ON hs_progress;
CREATE TRIGGER hs_progress_updated_at
  BEFORE UPDATE ON hs_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. hs_bookmarks
-- ============================================
CREATE TABLE IF NOT EXISTS hs_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES hs_profiles(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  title TEXT NOT NULL,
  note TEXT,
  tags TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS hs_bookmarks_updated_at ON hs_bookmarks;
CREATE TRIGGER hs_bookmarks_updated_at
  BEFORE UPDATE ON hs_bookmarks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. hs_quiz_results
-- ============================================
CREATE TABLE IF NOT EXISTS hs_quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES hs_profiles(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  time_taken_seconds INTEGER DEFAULT 0,
  answers JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. hs_comments
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

DROP TRIGGER IF EXISTS hs_comments_updated_at ON hs_comments;
CREATE TRIGGER hs_comments_updated_at
  BEFORE UPDATE ON hs_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. hs_announcements
-- ============================================
CREATE TABLE IF NOT EXISTS hs_announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_active BOOLEAN DEFAULT TRUE,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_hs_progress_user ON hs_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_hs_progress_user_path ON hs_progress(user_id, path_id);
CREATE INDEX IF NOT EXISTS idx_hs_bookmarks_user ON hs_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_hs_quiz_user ON hs_quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_hs_comments_path ON hs_comments(path_id, section_id);
CREATE INDEX IF NOT EXISTS idx_hs_announcements_active ON hs_announcements(is_active, starts_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE hs_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select" ON hs_profiles;
DROP POLICY IF EXISTS "profiles_update" ON hs_profiles;
CREATE POLICY "profiles_select" ON hs_profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_update" ON hs_profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE hs_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "progress_select" ON hs_progress;
DROP POLICY IF EXISTS "progress_insert" ON hs_progress;
DROP POLICY IF EXISTS "progress_update" ON hs_progress;
CREATE POLICY "progress_select" ON hs_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progress_insert" ON hs_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_update" ON hs_progress FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE hs_bookmarks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bookmarks_select" ON hs_bookmarks;
DROP POLICY IF EXISTS "bookmarks_insert" ON hs_bookmarks;
DROP POLICY IF EXISTS "bookmarks_update" ON hs_bookmarks;
DROP POLICY IF EXISTS "bookmarks_delete" ON hs_bookmarks;
CREATE POLICY "bookmarks_select" ON hs_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookmarks_insert" ON hs_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookmarks_update" ON hs_bookmarks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "bookmarks_delete" ON hs_bookmarks FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE hs_quiz_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "quiz_select" ON hs_quiz_results;
DROP POLICY IF EXISTS "quiz_insert" ON hs_quiz_results;
CREATE POLICY "quiz_select" ON hs_quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "quiz_insert" ON hs_quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE hs_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "comments_select" ON hs_comments;
DROP POLICY IF EXISTS "comments_insert" ON hs_comments;
DROP POLICY IF EXISTS "comments_update" ON hs_comments;
DROP POLICY IF EXISTS "comments_delete" ON hs_comments;
CREATE POLICY "comments_select" ON hs_comments FOR SELECT USING (is_hidden = FALSE);
CREATE POLICY "comments_insert" ON hs_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update" ON hs_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "comments_delete" ON hs_comments FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE hs_announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "announcements_select" ON hs_announcements;
CREATE POLICY "announcements_select" ON hs_announcements FOR SELECT USING (is_active = TRUE);

-- ============================================
-- SAMPLE DATA
-- ============================================
INSERT INTO hs_announcements (title, content, type) VALUES
  ('Harness Master 베타 오픈!', 'Claude Code 하네스 학습 사이트가 오픈했습니다.', 'update'),
  ('학습 경로 7개 완성', '소개부터 실전 프로젝트까지 완전한 학습 경로가 준비되어 있습니다.', 'info')
ON CONFLICT DO NOTHING;
