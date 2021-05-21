import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
    meUser: service(),
    roomRepository: service(),

    rooms: null,
    activeRoom: null,

    getAllRoomsTask: task(function* () {
        try {
            const rooms = yield this.get('roomRepository').getAllAvailableRooms();

            this.setProperties({
                rooms,
                activeRoom: (rooms || []).objectAt(0)
            })
        } catch(e) {
            console.log('e', e);
        }
    }),

    actions: {
        selectChat(room) {
            this.set('activeRoom', room);
        }
    }
});
