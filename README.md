## Friendo

A small React Native app that shows a list of friends and a list of todos for each friend. 
Written with TypeScript.

If you want a preview of the app, you can take a look at the [screenshots](./screenshots).

### Setting up development environment

Follow [React Native's setup instructions](https://reactnative.dev/docs/environment-setup).

- Install project dependencies: `npm i`
- Install Pods: `npx pod-install ios`

### Run the project

- `npx react-native run-ios`: run the app in debug mode on iOS. Alternatively, you can run `npm run xcode` to open XCode and build/run the app from there

## Debugging

The app supports debugging via Flipper v0.81. You can download Flipper [here](https://github.com/facebook/flipper/releases/tag/v0.81.0). 
Make sure to install the Redux Debugger plugin if you want to make the redux store debuggable as well.

Flipper will automatically connect to the running app.

### Running tests

Make sure to have `detox-cli` and `AppleSimUtils` installed (follow [Detox docs instructions](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md)).

1. `npm test:build`: build the app for end to end testing;
2. `npm test`: run end to end tests on an iOS simulator.

### About the implementation

Details about implementation choices are included in [SOLUTION.md](./SOLUTION.md).