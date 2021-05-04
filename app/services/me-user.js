import Service from '@ember/service';

export default Service.extend({
    /**
     * User name of current user
     *
     * @type {String}
     */
    userName: null,

    /**
     * Time when user login
     *
     * @type {Date}
     */
    loginTime: null,

    /**
     * Sets the username of current user.
     *
     * @param {String} userName    new username to be set
     */
    setUserName(userName) {
        this.set('userName', userName);
    }
});
