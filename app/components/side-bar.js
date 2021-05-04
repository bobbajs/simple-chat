import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
    classNames: [ 'side-bar' ],

    meUser: service(),

    // Passed by template
    rooms: null,
    activeRoom: null,
    duration: 0,

    /**
     * Calculate online duration, in minutes.
     *
     * @type {task}
     */
    updateOnlineDurationTask: task(function* () {
        try {
            yield timeout(60000);

            this.set('duration', this.get('duration') + 1);
            this.updateOnlineDuration();

        } catch(e) {
            // Future-improvement: Handle error
            console.error('e', e);
        }
    }).restartable(),

    /**
     * Helper method that will call task for updating online duration
     *
     * @method updateOnlineDuration
     */
    updateOnlineDuration() {
        this.get('updateOnlineDurationTask').perform();
    },

    didInsertElement() {
        this._super(...arguments);
        this.updateOnlineDuration();
    },

    willDestroyElement() {
        this.get('updateOnlineDurationTask').cancelAll();
        this._super(...arguments);
    }
});
