import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
    classNames: [ 'message-item' ],

    // Passed by template
    mesage: null,
    isReceived: false,
    sender: null,
});
