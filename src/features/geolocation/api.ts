import RNLocation from 'react-native-location';
import { GeolocationState } from './types';

// return errors according to the web geolocation spec
// see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
export const findUserLocation = (): Promise<GeolocationState> => {
  return RNLocation.requestPermission({ ios: 'whenInUse' })
    .then((granted) => {
      return granted
        ? RNLocation.getLatestLocation()
        : Promise.reject(Error('PERMISSION_DENIED'));
    })
    .then((location) => {
      if (location === null) {
        return Promise.reject(Error('TIMEOUT'));
      }

      return {
        lat: location.latitude,
        lng: location.longitude,
        status: 'OK',
      };
    });
};
