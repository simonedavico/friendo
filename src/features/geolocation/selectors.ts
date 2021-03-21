import { AppState } from '../../store';

export const selectGeolocation = (state: AppState) => state.geolocation;
