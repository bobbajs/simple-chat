import $ from 'jquery';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
    classNames: [ 'chat-view' ],

    meUser: service(),
    roomRepository: service(),
    websockets: service(),

    // Passed by template
    activeRoom: null,

    messageToSend: null,
    messages: null,

    /**
     * List of users, not including current users
     *
     * @type {Array}
     */
    notMeUsers: computed('activeRoom.users.[]', function() {
        const notMeUsers = (this.get('activeRoom.users') || []).filter(user => {
            return user !== this.get('meUser.userName');
        });

        return notMeUsers.length > 0 ? ', ' + notMeUsers.join(', ') : null;
    }).readOnly(),

    /**
     * List of messages with identifier type whether it's a received or sent message
     *
     * @type {Array}
     */
    formattedMessages: computed('messages.[]', function() {
        return (this.get('messages') || []).map(item => {
            const { name, message } = item;

            return {
                name,
                message,
                isReceived: name !== this.get('meUser.userName')
            }
        })
    }).readOnly(),

    /**
     * Task for sending message
     *
     * @task {Task}
     */
    sendMessageTask: task(function* () {
        try {
            const message = this.get('messageToSend');

            if (!isPresent(message)) {
                console.error('show error when trying to send empty message');
                return false;
            }

            const data = { name: this.get('meUser.userName'), message };

            yield this.get('roomRepository').sendMessage(data, this.get('activeRoom.id'));

            this.set('messageToSend', null);

            debounce(this, () => {
                this.scrollToBottom();
            }, 500);

        } catch(e) {
            // Future improvement: Handle error
            console.log('error', e);
        }
    }),

    scrollToBottom() {
        const scrollArea = document.getElementById('chatScrollArea');
        scrollArea.scrollTop = scrollArea.scrollHeight;
    },

    loadMessagesTask: task(function* () {
        try {

            const messages = yield this.get('roomRepository').getMessages(this.get('activeRoom.id'));

            this.set('messages', messages);

            yield timeout(500);

            this.pollMessages();
        } catch (e) {
            console.log('error', e);
        }
    }).keepLatest(),

    pollMessages() {
        this.get('loadMessagesTask').perform();
    },

    didUpdateAttrs() {
        this._super(...arguments);

        if (isPresent(this.get('activeRoom'))) {
            this.get('loadMessagesTask').cancelAll();
            this.pollMessages();

        }
    },

    willDestroyElement() {
        this.get('loadMessagesTask').cancelAll();
        this._super(...arguments);
    }
});
