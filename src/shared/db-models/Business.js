import {MongoModel} from 'n158/classes';

export class BusinessModel extends MongoModel {

    constructor (db) {
        super(db, 'business', {
            title: 'Business',
            type: 'object',
            properties: {
              address: { type: 'string' },
              name: { type: 'string' },
              timestamp: { type: 'string' },
              latitude: { type: 'string' },
              longitude: { type: 'string' },
              contactNumber: { type: 'string' },
              contactName: { type: 'string' },
              commentary: { type: 'string' },
              hasOwnTv: { type: 'string' },
              screensAmount: { type: 'string' },
              deviceType: { type: 'string' }, // 0 - Dumb, 1 - Smart
            },
            required: []
        }, {
            indexes: []
        });
    }

}