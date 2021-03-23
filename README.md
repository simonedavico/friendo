## Friendo

A small React Native app that shows a list of friends and a list of todos for each friend.
Written with TypeScript.

### Setting up development environment

Follow [React Native's setup instructions](https://reactnative.dev/docs/environment-setup).

### Run the project

- `npx react-native run-ios`: run the app in debug mode on iOS. Alternatively, you can run `npm run xcode` to open XCode and build/run the app from there

### Running tests

Make sure to have `detox-cli` and `AppleSimUtils` installed (follow [Detox docs instructions](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md)).

1. `npm test:build`: build the app for end to end testing;
2. `npm test`: run end to end tests on an iOS simulator.

### About the implementation

Details about implementation choices are included in [SOLUTION.md](./SOLUTION.md).