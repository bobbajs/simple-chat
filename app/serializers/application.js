import DS from "ember-data";
import { pluralize } from 'ember-inflector';
import { set } from '@ember/object';

export default DS.RESTSerializer.extend({
    normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
        const rootName = pluralize(primaryModelClass.modelName);
        let newPayload = {};

        // normalize response to the format that Ember Store expects.
        set(newPayload, rootName, payload);
        console.log(newPayload);

        return this._super(store, primaryModelClass, newPayload, id, requestType);
    }
});