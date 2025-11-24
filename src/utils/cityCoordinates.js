// utils/cityCoordinates.js
// UK city coordinates for mapping
export const cityCoordinates = {
  "London": { lat: 51.5074, lng: -0.1278 },
  "Manchester": { lat: 53.4808, lng: -2.2426 },
  "Birmingham": { lat: 52.4862, lng: -1.8904 },
  "Edinburgh": { lat: 55.9533, lng: -3.1883 },
  "Glasgow": { lat: 55.8642, lng: -4.2518 },
  "Liverpool": { lat: 53.4084, lng: -2.9916 },
  "Bristol": { lat: 51.4545, lng: -2.5879 },
  "Oxford": { lat: 51.7520, lng: -1.2577 },
  "Cambridge": { lat: 52.2053, lng: 0.1218 },
  "Leeds": { lat: 53.8008, lng: -1.5491 },
  "Sheffield": { lat: 53.3811, lng: -1.4701 },
  "York": { lat: 53.9590, lng: -1.0815 },
  "Newcastle": { lat: 54.9783, lng: -1.6178 },
  "Cardiff": { lat: 51.4816, lng: -3.1791 },
  "Belfast": { lat: 54.5973, lng: -5.9301 },
  "Nottingham": { lat: 52.9548, lng: -1.1581 },
  "Leicester": { lat: 52.6369, lng: -1.1398 },
  "Coventry": { lat: 52.4068, lng: -1.5197 },
  "Hull": { lat: 53.7457, lng: -0.3367 },
  "Plymouth": { lat: 50.3755, lng: -4.1427 },
  "Southampton": { lat: 50.9097, lng: -1.4044 },
  "Portsmouth": { lat: 50.8198, lng: -1.0880 },
  "Brighton": { lat: 50.8225, lng: -0.1372 },
  "Reading": { lat: 51.4543, lng: -0.9781 },
  "Milton Keynes": { lat: 52.0406, lng: -0.7594 },
  "Northampton": { lat: 52.2405, lng: -0.9027 },
  "Luton": { lat: 51.8796, lng: -0.4175 },
  "Aberdeen": { lat: 57.1497, lng: -2.0943 },
  "Dundee": { lat: 56.4620, lng: -2.9707 },
  "Exeter": { lat: 50.7184, lng: -3.5339 },
  "Norwich": { lat: 52.6309, lng: 1.2974 },
  "Bath": { lat: 51.3758, lng: -2.3599 },
  "Chester": { lat: 53.1934, lng: -2.8931 },
  "Inverness": { lat: 57.4778, lng: -4.2247 },
  "Swansea": { lat: 51.6214, lng: -3.9436 },
  "Derby": { lat: 52.9225, lng: -1.4746 }
};


export const getRandomUKLat = () => 49.9 + Math.random() * 8.7; 
export const getRandomUKLng = () => -8.2 + Math.random() * 10.0; 


export const getRandomUKCoordinates = () => {
  return {
    lat: getRandomUKLat(),
    lng: getRandomUKLng()
  };
};