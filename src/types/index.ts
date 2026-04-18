export type Language = 'ko' | 'en';
export type ThemeMode = 'auto' | 'light' | 'dark';
export type ColorTheme = 'harness' | 'tech' | 'ocean' | 'forge' | 'night';

export interface LearningPath {
  id: string;
  icon: string;
  nameKo: string;
  nameEn: string;
  descKo: string;
  descEn: string;
  color: string;
  path: string;
  topics: string[];
}

export interface Section {
  id: string;
  icon: string;
  ko: string;
  en: string;
}

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string;
  provider: string;
  role: string;
  created_at: string;
  updated_at: string;
}
