// hereApi.js
import Constants from 'expo-constants';

const { hereApiKey } = Constants.expoConfig.extra;

// Function to interact with the Here API
export const fetchHereApiData = async (query) => {
  const response = await fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?at=0,0&q=${query}&apiKey=${hereApiKey}`);
  const data = await response.json();
  return data;
};
