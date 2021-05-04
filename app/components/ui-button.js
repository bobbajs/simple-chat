import Component from '@ember/component';
import layout from '../templates/components/ui-button';

export default Component.extend({
    attributeBindings: [ 'disabled' ],
    classNames: [ 'btn' ],
    layout,
    tagName: 'button',

    // Passed by template
    label: '',

    click() {
        if (this.onClick) {
            this.onClick();
        }
    }
});
