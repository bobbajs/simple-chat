import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    urlForQuery() {
        return this.buildURL('rooms');
    },

    sendMessage(data, roomId) {
        const path = `${this.buildURL('rooms')}/${roomId}/messages`;

        return this.ajax(path, 'POST', { data });
    },

    getMessages(roomId) {
        const path = `${this.buildURL('rooms')}/${roomId}/messages`;

        return this.ajax(path, 'GET');
    }
})