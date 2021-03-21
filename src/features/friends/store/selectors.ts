import { createSelector } from '@reduxjs/toolkit';
import { distanceBetween } from 'geofire-common';
import { AppState } from '../../../store';
import { selectGeolocation } from '../../geolocation/selectors';
import { friendsAdapter } from '.';
import { FriendWithDistance } from '../types';

const { selectAll, selectById } = friendsAdapter.getSelectors<AppState>(
  (state) => state.friends,
);

/**
 * Select the list of friends from the store.
 * Friends will be sorted by distance from the current position
 * if the permission has been granted.
 */
export const selectFriends = createSelector(
  selectAll,
  selectGeolocation,
  (friends, geolocation): FriendWithDistance[] => {
    return geolocation.status === 'OK'
      ? friends
          .map((f) => ({
            ...f,
            distanceInKm: distanceBetween(
              [geolocation.lat, geolocation.lng],
              [f.address.geo.lat, f.address.geo.lng],
            ),
          }))
          .sort((f1, f2) => f1.distanceInKm - f2.distanceInKm)
      : friends;
  },
);

export { selectById };
