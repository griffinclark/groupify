import * as Facebook from 'expo-facebook'
//Asks for permission for facebook to track user data, used in App.tsx
const fbInit= async ()=> {
    await Facebook.initializeAsync({appId:'693164164986653',appName:"Munchkin Labs"})
    let response = await Facebook.getPermissionsAsync()
    if (response.status=="undetermined"){
        response = await Facebook.requestPermissionsAsync()
    }
    else if (response.granted==true){
        console.log("The user HAS granted data permissions for facebook")
        await Facebook.setAdvertiserTrackingEnabledAsync(true)
    }
    else {
        console.log("The user HAS NOT granted data permissions for facebook")
        await Facebook.setAdvertiserTrackingEnabledAsync(false)
    }

  }

  export default fbInit