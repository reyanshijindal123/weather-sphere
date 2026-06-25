import { ForecastItem, DailyForecast, HourlyForecast } from '@/types';
import { TemperatureUnit } from '@/types';
import { getDateString, getTodayString, getShortDayName, formatHour, formatDate } from './date-helper';
import { convertTemp } from './temperature-helper';
import { getIconUrl } from './weather-helper';

export function groupForecastByDay(items: ForecastItem[]): DailyForecast[] {
  const todayStr = getTodayString();
  const grouped: Record<string, ForecastItem[]> = {};

  for (const item of items) {
    const dateStr = getDateString(item.dt);
    if (dateStr === todayStr) continue;
    if (!grouped[dateStr]) grouped[dateStr] = [];
    grouped[dateStr].push(item);
  }

  return Object.entries(grouped)
    .slice(0, 5)
    .map(([date, dayItems]) => {
      const temps = dayItems.map((i) => i.temp);
      const midday = dayItems.find((i) => {
        const hour = new Date(i.dt * 1000).getHours();
        return hour >= 11 && hour <= 14;
      }) ?? dayItems[Math.floor(dayItems.length / 2)];

      const dt = new Date(date).getTime() / 1000 + 43200;

      return {
        date,
        dayName: getShortDayName(midday.dt),
        icon: getIconUrl(midday.icon, 2),
        description: midday.description,
        conditionMain: midday.conditionMain,
        tempMax: Math.round(Math.max(...temps)),
        tempMin: Math.round(Math.min(...temps)),
      };
    });
}

export function getHourlyForecast(items: ForecastItem[], count: number = 8): HourlyForecast[] {
  return items.slice(0, count).map((item) => ({
    time: formatHour(item.dt),
    temp: Math.round(item.temp),
    icon: getIconUrl(item.icon, 2),
    pop: Math.round(item.pop * 100),
  }));
}

export function convertHourlyTemps(hourly: HourlyForecast[], unit: TemperatureUnit): HourlyForecast[] {
  return hourly.map((h) => ({ ...h, temp: convertTemp(h.temp, unit) }));
}

export function convertDailyTemps(daily: DailyForecast[], unit: TemperatureUnit): DailyForecast[] {
  return daily.map((d) => ({
    ...d,
    tempMax: convertTemp(d.tempMax, unit),
    tempMin: convertTemp(d.tempMin, unit),
  }));
}
