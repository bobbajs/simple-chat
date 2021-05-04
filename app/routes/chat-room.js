import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Route.extend({
    meUser: service(),

    setupController(controller) {
        controller.get('getAllRoomsTask').perform();
    },

    beforeModel() {
        if (!isPresent(this.get('meUser.userName'))) {
            this.replaceWith('/login');
        }
    }
});
