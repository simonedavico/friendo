export type GeolocationPositionError =
  | 'PERMISSION_DENIED'
  | 'POSITION_UNAVAILABLE'
  | 'TIMEOUT'
  | 'UNASKED';

export type GeolocationWithoutPermission = { status: GeolocationPositionError };

export type GeolocationWithPermission = {
  status: 'OK';
  lat: number;
  lng: number;
};

export type GeolocationState =
  | GeolocationWithPermission
  | GeolocationWithoutPermission;
