import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Controller.extend({
    meUser: service(),

    userName: null,
    hasMissingUserNameError: null,

    isUserNameEmpty: computed('userName', function() {
        return !isPresent(this.get('userName'));
    }).readOnly(),

    actions: {
        joinChat() {
            if (this.get('isUserNameEmpty')) {
                this.set('hasMissingUserNameError', true);
                return false;
            }

            this.set('hasMissingUserNameError', false);
            this.get('meUser').setUserName(this.get('userName'));
            this.transitionToRoute('chat-room');
        }
    }
});
