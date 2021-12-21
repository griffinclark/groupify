import * as Facebook from 'expo-facebook';
//Asks for permission for facebook to track user data, used in App.tsx
const fbInit= async ()=> {
    await Facebook.initializeAsync({appId:'693164164986653',appName:"Munchkin Labs"});
    const response = await Facebook.getPermissionsAsync();
    let finalResponse= response;
    if (response.status=="undetermined"){
        const newResponse = await Facebook.requestPermissionsAsync();
        finalResponse= newResponse;
    }
    else if (finalResponse.granted==true){
        console.log("The user HAS granted data permissions for facebook");
        await Facebook.setAdvertiserTrackingEnabledAsync(true);
    }
    else {
        console.log("The user HAS NOT granted data permissions for facebook");
        await Facebook.setAdvertiserTrackingEnabledAsync(false);
    }

  };

  export default fbInit;