
import axios from 'axios';
import { PhotoRealmContext } from '../db';

const photosListUrl = "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1";

const fetchPhotosListAPI = async () => {

return new Promise((resolve, reject) => {
   axios
   .get(photosListUrl)
   .then((response) => {
       resolve(response);
   })
   .catch((error) => {
       reject(error);
   });
});
};

export {fetchPhotosListAPI};