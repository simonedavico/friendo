import Geolocation from '@react-native-community/geolocation';
import { GeolocationPositionError, GeolocationState } from './types';

const codeToError: Record<number, GeolocationPositionError> = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT',
};

export const findUserLocation = (): Promise<GeolocationState> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (geoRes) => {
        resolve({
          lat: geoRes.coords.latitude,
          lng: geoRes.coords.longitude,
          status: 'OK',
        });
      },
      (error) => {
        reject({ error: codeToError[error.code] });
      },
    );
  });
};
