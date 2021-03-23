import { Friend } from './types';

const baseUrl = 'https://jsonplaceholder.typicode.com/users';

// TODO: we should add a validation layer for the response,
// such as zod or io-ts

type FriendResponse = Friend & {
  address: {
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export const fetchFriends = async (): Promise<Friend[]> => {
  return fetch(baseUrl, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((friends) =>
      friends.map((f: FriendResponse) => ({
        ...f,
        address: {
          ...f.address,
          geo: {
            lat: Number.parseFloat(f.address.geo.lat),
            lng: Number.parseFloat(f.address.geo.lng),
          },
        },
      })),
    );
};
