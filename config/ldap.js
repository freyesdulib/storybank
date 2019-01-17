'use strict';

var ldapConfig = process.env.LDAP_URL;

module.exports = function () {
    return ldapConfig;
};