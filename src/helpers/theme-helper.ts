import { ThemeMode } from '@/types';

export function isValidTheme(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function getThemeLabel(mode: ThemeMode): string {
  const labels: Record<ThemeMode, string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  };
  return labels[mode];
}

export function getNextTheme(current: ThemeMode): ThemeMode {
  const cycle: ThemeMode[] = ['light', 'dark', 'system'];
  const idx = cycle.indexOf(current);
  return cycle[(idx + 1) % cycle.length];
}
