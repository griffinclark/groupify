# Meep

## Tool Dependencies
- Node.JS 14
- Globally install the following Node packages: `expo-cli` `@aws-amplify/cli` `yarn`

## Getting started:
- Clone the repo
- `expo register` from root to create an account
    - it should open a page in your browser: follow the prompts to create an account
- Run `yarn` in the repo root
- `amplify init`: this will walk you through the setup for your credentials. Our AWS region is `us-west-2`, and make sure to elect to use an existing environment (`staging` for all uses; **only use `production` for packages that will be submitted to an app store for users, and never test on this environment**). The CLI will ask you to authenticate, do so via a new profile, and "use an existing user". Contact @daviddetweiler for your AWS CLI credentials.
- `expo start` from root

### If you have an iPhone:
- install Expo Go from the app store
- log in with the same account you made during the register step
- scan the QR code with your camera app, and open the link in Expo Go
- iOS should ask you to allow Expo Go to access local networks, say yes 
- scan the QR code again and you should see the app prototype

### If you have an android:
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
