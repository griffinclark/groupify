export const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

export const durationCalculation = async (origin: {lat: number, lng: number}, destination: {lat: number, lng: number}) : Promise<string> => {

    const search = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat}%2C${origin.lng}&destinations=${destination.lat}%2C${destination.lng}&key=${GOOGLE_PLACES_API_KEY}`;
    
    const response = await fetch(search);
    const duration = await response.json();

    return duration.rows[0].elements[0].status === 'OK' ? duration.rows[0].elements[0].duration.text : 'No Data';    
}