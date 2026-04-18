import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';

export interface ProgressState {
  [tutorialId: string]: {
    [stepId: string]: {
      [checkId: string]: boolean;
    };
  };
}

const STORAGE_KEY = 'hs_tutorial_progress';

function loadLocal(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressState) : {};
  } catch {
    return {};
  }
}

function saveLocal(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function useTutorialProgress(userId?: string) {
  const [progress, setProgress] = useState<ProgressState>(() => loadLocal());
  const [syncing, setSyncing] = useState(false);

  /* Sync from Supabase on login */
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    async function fetchProgress() {
      setSyncing(true);
      try {
        const { data, error } = await supabase
          .from('hs_progress')
          .select('course_id, lesson_id, check_id, completed')
          .eq('user_id', userId);

        if (error || !data || cancelled) return;

        const merged: ProgressState = loadLocal();
        for (const row of data) {
          const { course_id, lesson_id, check_id, completed } = row as {
            course_id: string;
            lesson_id: string;
            check_id: string;
            completed: boolean;
          };
          if (!merged[course_id]) merged[course_id] = {};
          if (!merged[course_id][lesson_id]) merged[course_id][lesson_id] = {};
          merged[course_id][lesson_id][check_id] = completed;
        }
        setProgress(merged);
        saveLocal(merged);
      } finally {
        if (!cancelled) setSyncing(false);
      }
    }

    void fetchProgress();
    return () => { cancelled = true; };
  }, [userId]);

  const toggleCheck = useCallback(
    async (tutorialId: string, stepId: string, checkId: string) => {
      setProgress(prev => {
        const next: ProgressState = {
          ...prev,
          [tutorialId]: {
            ...(prev[tutorialId] ?? {}),
            [stepId]: {
              ...(prev[tutorialId]?.[stepId] ?? {}),
              [checkId]: !(prev[tutorialId]?.[stepId]?.[checkId] ?? false),
            },
          },
        };
        saveLocal(next);
        return next;
      });

      if (userId) {
        const newVal = !(progress[tutorialId]?.[stepId]?.[checkId] ?? false);
        await supabase.from('hs_progress').upsert(
          {
            user_id: userId,
            course_id: tutorialId,
            lesson_id: stepId,
            check_id: checkId,
            completed: newVal,
          },
          { onConflict: 'user_id,course_id,lesson_id,check_id' }
        );
      }
    },
    [progress, userId]
  );

  const isChecked = useCallback(
    (tutorialId: string, stepId: string, checkId: string): boolean =>
      progress[tutorialId]?.[stepId]?.[checkId] ?? false,
    [progress]
  );

  const stepProgress = useCallback(
    (tutorialId: string, stepId: string, totalChecks: number): number => {
      if (totalChecks === 0) return 0;
      const checked = Object.values(progress[tutorialId]?.[stepId] ?? {}).filter(Boolean).length;
      return Math.round((checked / totalChecks) * 100);
    },
    [progress]
  );

  const tutorialProgress = useCallback(
    (tutorialId: string, totalChecks: number): number => {
      if (totalChecks === 0) return 0;
      let checked = 0;
      const steps = progress[tutorialId] ?? {};
      for (const step of Object.values(steps)) {
        checked += Object.values(step).filter(Boolean).length;
      }
      return Math.round((checked / totalChecks) * 100);
    },
    [progress]
  );

  return { progress, syncing, toggleCheck, isChecked, stepProgress, tutorialProgress };
}
