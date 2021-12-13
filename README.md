# Meep

## Tool Dependencies
- Node.JS 14
- Globally install the following Node packages: `expo-cli` `@aws-amplify/cli` `yarn`

## Getting started:
- Clone the repo
- Run `expo register` in the repo root to create an account
    - it should open a page in your browser: follow the prompts to create an account
- Run `yarn` in the repo root
- Run `amplify init` in the repo root: this will walk you through the setup for your credentials. Our AWS region is `us-west-2`, and make sure to elect to use an existing environment (`staging` for all uses; **only use `production` for packages that will be submitted to an app store for users, and never test on this environment**). The CLI will ask you to authenticate, do so via a new profile, and "use an existing user". Contact jquach@munchkinlabs.us for your AWS CLI credentials.
- Run `expo start` in the repo root

## Setting up your enviroment after a clone or before every new task
### After a clone
- git clone the repository
- Run yarn install
- Run amplify init 
- Run amplify pull
- Run amplify codegen

### New task
before every new task or build, you want to run the following commands at the beginning to ensure your local enviroment is in sync with the cloud enviroment.
- Run amplify pull
- Run amplify codegen

### If you have an iPhone:
- install Expo Go from the app store
- log in with the same account you made during the register step
- scan the QR code with your camera app, and open the link in Expo Go
- iOS should ask you to allow Expo Go to access local networks, say yes
- scan the QR code again and you should see the app prototype

### If you have an Android:
- install Expo Go from the Play Store
- log in with the same account you made during the register step
- scan the QR code with the Expo Go app

## Keeping your local copy up-to-date (for frontend developers)

After pulling or merging new changes, you'll want to re-run `expo install` to capture dependency changes. Then, check
for backend changes by running `amplify status`, and `amplify pull` to synchronize any new changes.

## Expo and package compatibility

When installing a new package, it's important to always use `expo install` instead of the equivalent yarn command. Until we switch to an Expo bare build, this command will ensure we use a version of each package made available to us in the Expo client.

### On Windows
- if you're getting errors trying to run `expo ...` commands
    - open Powershell as an administrator
    - run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`
    - run the expo command again

## To build app for release
[expo docs](https://docs.expo.io/distribution/building-standalone-apps/)

check that you are in the amplify production environment and all backend resourses are up to date.
- run `amplify status`
- env should be `production`
- all resources should say no change
- make sure you've pulled recently

### for ios
- in app.json go to ios > buildNumber and increment that number
- run `expo build:ios -t archive`
- after the build has built, download it from the url provided
- upload build to transporter and hit deliver

### for android
- run `expo push:android:show`
- if you don't see FCM API key listed, contact jquach@munchkinlabs.us for the key
- run `expo push:android:upload --api-key <your-token-here>`, replacing `<your-token-here>` with the key
- in app.json go to android > versionCode and increment that number
- run `expo build:android -t app-bundle`

## Atomic Design 0

This app is structured using the atomic design philosophy, if you are unfamiliar with that you can read more about it [here](https://bradfrost.com/blog/post/atomic-web-design/)
