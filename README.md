# Meep

## To use this repo:
- clone the repo
- `npm install --global expo-cli` from root
- `expo register` from root to create an account
    - it should open a page in your browser: follow the prompts to create an account
- `expo install` from root
- `expo start` from root 
If you have an iphone: 
- install Expo Go from the app store
- log in with the same account you made during the register step
- scan the QR code with your camera app, and open the link in Expo Go
- iOS should ask you to allow Expo Go to access local networks, say yes 
- scan the QR code again and you should see the app prototype
If you have an android: 
- install Expo Go from the Play Store
- log in with the same account you made during the register step
- scan the QR code with the Expo Go app

## Expo and package compatibility

When installing a new package, it's important to always use `expo install` instead of the equivalent npm or yarn commands. Until we switch to an Expo bare build, this command will ensure we use a version of each package made available to us in the Expo client.

## Troubleshooting
### On Windows
- if you're getting errors trying to run `expo ...` commands
    - open Powershell as an administrator 
    - run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned` 
    - run the expo command again

## Atomic Design 0

This app is structured using the atomic design philosophy, if you are unfamiliar with that you can read more about it [here](https://bradfrost.com/blog/post/atomic-web-design/)

## Current status
### Carbon TODO 
1. These screens are re-usable:
    - SelectFriends
    - Home
    - SelectTags
    - SelectFriends
    - EventResults

