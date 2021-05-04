import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),

    getAllAvailableRooms() {
        return this.get('store').query('room', {});
    },

    sendMessage(data, roomId) {
        return this.get('store').adapterFor('room').sendMessage(data, roomId);
    },

    getMessages(roomId) {
        return this.get('store').adapterFor('room').getMessages(roomId);
    }
});
