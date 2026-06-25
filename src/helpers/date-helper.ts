import { DAY_NAMES } from '@/constants';

export function formatTime(unix: number, timezone: number): string {
  const date = new Date((unix + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${minutes} ${ampm}`;
}

export function formatHour(unix: number): string {
  const date = new Date(unix * 1000);
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h} ${ampm}`;
}

export function getDayName(unix: number): string {
  const date = new Date(unix * 1000);
  return DAY_NAMES[date.getDay()];
}

export function getShortDayName(unix: number): string {
  const date = new Date(unix * 1000);
  return DAY_NAMES[date.getDay()].slice(0, 3);
}

export function getDateString(unix: number): string {
  const date = new Date(unix * 1000);
  return date.toISOString().split('T')[0];
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(unix: number): string {
  const date = new Date(unix * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
