(function () {

    'use strict';

    var TagService = function () {

        var vm = this;
        vm.tags = [];
        vm.relatedLinks = [];

        vm.addTag = function (tag) {

            var tags = vm.tags,
                exists;

            exists = vm.findTag(tag, tags);

            if (!exists) {
                vm.tags.push({name: tag});
            }
        };

        vm.findTag = function (name, tagsArr) {

            if (tagsArr.constructor !== Array || tagsArr === undefined) {
                return false;
            }

            for (var i = 0; i < tagsArr.length; i++) {
                if (tagsArr[i].name === name) {
                    return true;
                }
            }
        };

        vm.removeTag = function (i) {
            vm.tags.splice(i, 1);
        };

        vm.addRelatedLink = function () {
            vm.relatedLinks.push({});
        };

        vm.removeRelatedLink = function (i) {
            vm.relatedLinks.splice(i, 1);
        };
    };

    angular.module('stories').service('TagService', [TagService]);

}());