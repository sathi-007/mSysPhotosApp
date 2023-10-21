const Realm = require("realm");
export default class Photo extends Realm.Object {
    static schema = {
      name: 'Photo',
      properties: {
        id: 'int',
        farm: 'string',
        secret:'string',
        title:'string',
        server:'string'
      },
      primaryKey: 'id',
    };
  }
  