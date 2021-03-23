# Solution explanation

The solution implements a React Native app written in TypeScript, `friendo`.

## App description

The app merges both parts of the assignment, `FriendToDo` and `FriendFinder`. Some screenshots of the app can be found in the [screenshots](./screenshots) directory.

The result is an app that:

- Allows the user to view a list of their friends, sorted by their distance to the user current position; if the position cannot be retrieved (or the user does not grant permission to access the GPS), the list of friends is unordered;
- For each friend, it is possible to view their contact info (address), call their phone number, or o open Maps for directions to the friend's position;
- For each friend, it is also possible to view a list of todos, with the possibility to add a todo, mark a todo as completed, or delete a todo.

In the following sections, I am describing the project structure and some of the technical choices I have made.

## Project structure

```
├── src
│   ├── App.tsx
│   ├── design
│   │   ├── AppList.tsx
│   │   ├── Avatar.tsx
│   │   ├── CardLabel.tsx
│   │   ├── ...
│   ├── features
│   │   ├── friends
│   │   ├── geolocation
│   │   └── todos
│   ├── screens
│   │   ├── FriendsWithTodos
│   │   └── UnexpectedErrorScreen.tsx
│   ├── store
│   │   ├── hooks.ts
│   │   └── index.ts
```

- The `design` directory includes everything related to the design system of the app: the definition of style variables (e.g. spacing and border radii) and a set of components that are reused across different screens;
- The `features` directory includes the busines logic (redux reducers/thunks/remote API layer). It is organised in one subdirectory for each main app feature: `todos`, `friends` and `geolocation`;
- The `screens` directory includes the app screens;
- The `store` directory includes some glue code to setup redux and well-typed versions of the `useDispatch` and `useSelector` hooks.
- `App.tsx` is the main application component.

## State management

The app uses Redux for state management. I believe Redux to be a good choice for React Native apps in general, for the following reasons:

1. It makes easy to aggregate data in different ways for different screens;
2. It provides good tooling for debugging, as the Redux Debugger is integrated into Flipper;
3. It is a well documented pattern and has a good array of open source solutions to enhance its capabilities (e.g., `redux-persist` for automatically persisting the app state to storage, or `redux-offline` to handle remote API calls in an offline-first way);

To define reducers, actions and thunks I adopted the modern/recommended approach, by leveraging [redux-toolkit](https://redux-toolkit.js.org/) factory functions.

The business logic of the thunks is optimistic, meaning that the app does not wait for the response from the REST API to give feedback to the user; it assumes the action will be ok most of the time, and eventually reverts the action if the API call results in error.

For example, when a new todo is created, the app adds a todo with a fake id to the redux store. When the creation API response comes back, it updates the fake id with the actual one returned from the server. If the API call results in an error, the app deletes the newly created todo from the store.

## Styling and components

All the app screens and components are built on top of [react-native-paper](https://callstack.github.io/react-native-paper/) components. I also defined a small set of components to act as "design tokens", for consistency across screens, and a shared set of variables such as spacing and typography.

The app offers both a light and a dark theme, based on the preference set in the device settings.

Navigation across screens is implemented with [React Navigation](https://reactnavigation.org/).

## Testing

I skipped any form of unit testing for app screens and state logic, as I did not have enough time to provide good coverage.

I implemented a small set of end to end tests with [Detox](https://github.com/wix/Detox) which cover the todos CRUD features. For simplicity (and lack of time) I did not configure `ts-jest` to write tests in TypeScript.

## Error handling

The app business logic (i.e., the thunks) should handle most error case. I may have skipped some, but I should have left a `TODO` comment in every case.

At the React level, error handling is implemented via an error boundary on the top level app component and an accompanying logger which logs the uncaught error (in a real life application, it would send the error stack trace to Crashlytics, Sentry or equivalent).

## Debugging

The app integrates with version 0.81 of the [Flipper](https://fbflipper.com/) debugger. If the `redux-debugger` extension for Flipper is installed, it will also be possible to debug the redux store and dispatched actions through Flipper.

## Limitations

Some limitations I am aware of:

- The app was only tested on iOS; it probably runs fine on Android, but requires some setup (like adding the required permission for geolocation in the manifest file);
- Some views do not handle corner cases: for example, lists do not handle the empty state (can occur if you delete all todos for a friend);
- I have not fully tested the navigation and call features as they are not available on the iPhone Simulator.
- I have not implemented the bonus point about displaying the friends' positions on a map. I think all the other points should be covered.