import { create } from "zustand";
import { WeatherData } from "@/types";

interface WeatherStore {
  weather: WeatherData | null;
  setWeather: (weather: WeatherData) => void;
  clearWeather: () => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,

  setWeather: (weather) =>
    set({
      weather,
    }),

  clearWeather: () =>
    set({
      weather: null,
    }),
}));