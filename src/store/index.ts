import { configureStore, Middleware } from '@reduxjs/toolkit';
import friendsSlice from '../features/friends/store';

const store = configureStore({
  reducer: {
    [friendsSlice.name]: friendsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const flipperMiddleware = require('redux-flipper').default() as Middleware;
    return __DEV__
      ? getDefaultMiddleware().concat(flipperMiddleware)
      : getDefaultMiddleware();
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
