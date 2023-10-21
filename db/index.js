import {createRealmContext} from '@realm/react';
import Photo from './models/photo';
export const PhotoRealmContext = createRealmContext({
  schema: [Photo]  
});