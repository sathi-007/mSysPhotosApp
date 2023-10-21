import { FETCH_PHOTOS_LIST, FETCH_PHOTOS_LIST_ERROR, FETCH_PHOTOS_LIST_SUCCESS, LOAD_IMAGE } from "../constants"

export const fetchPhotosList = () => {
    return {
        type:FETCH_PHOTOS_LIST
    }
  };

export const loadPhoto=(farm,server,id,secret)=>{
    return{
        type: LOAD_IMAGE,
        farm:farm,
        server:server,
        id:id,
        secret:secret
    }
}