export function getCurrentPosition(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            reject(new Error('Location permission denied. Please search for a city manually.'));
            break;
          case err.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'));
            break;
          case err.TIMEOUT:
            reject(new Error('Location request timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred getting location.'));
        }
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  });
}

export function buildCityId(city: string, country: string): string {
  return `${city.toLowerCase()}-${country.toLowerCase()}`;
}
