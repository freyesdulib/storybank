(function () {

    'use strict';

    var StoriesController = function ($scope, $location, $routeParams, $filter, $timeout, Authentication, Stories, Tags, Flash, TagService) {

        var vm = this;
        vm.authentication = Authentication;

        vm.isMobile = function () {

            var isMobile = false;

            if ((screen.width <= 540)) {
                isMobile = true;
            }

            return isMobile;
        };

        var successMessage = function (successMessage) {
            $('form').hide();
            var message = '<strong><span class="glyphicon glyphicon-ok">&nbsp;' + successMessage + '</span></strong>';
            Flash.create('success', message, 'custom-class');
            parent.scrollTo(0, 0);
            $timeout(function () {
                $location.path('stories');
            }, 5000);
        };

        // https://github.com/kvz/phpjs/blob/master/functions/strings/strip_tags.js
        var strip_tags = function (input, allowed) {

            var input = input.replace(/<br\s*[\/]?>/gi, ' ');

            allowed = (((allowed || '') + '')
                .toLowerCase()
                .match(/<[a-z][a-z0-9]*>/g) || [])
                .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
            var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
                commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
            return input.replace(commentsAndPhpTags, '')
                .replace(tags, function ($0, $1) {
                    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
                });
        };

        vm.addTag = TagService.addTag;
        vm.removeTag = TagService.removeTag;
        vm.tags = TagService.tags;
        vm.addRelatedLink = TagService.addRelatedLink;
        vm.removeRelatedLink = TagService.removeRelatedLink;
        vm.relatedLinks = TagService.relatedLinks;
        vm.findTag = TagService.findTag;

        vm.getTags = function () {
            vm.tagList = Tags.query();
        };

        vm.truncate = function (story) {

            if (story.split(' ').length > 79) {
                return story.substring(0, 300);
            }

            return story;
        };

        vm.storiesCreateFormInit = function () {

            var rlTmp,
                tTmp;

            rlTmp = TagService.relatedLinks = [];
            vm.relatedLinks = rlTmp;
            tTmp = TagService.tags = [];
            vm.tags = tTmp;
            vm.getTags();
        };

        vm.storiesEditFormInit = function () {

            var rlTmp,
                tTmp;

            rlTmp = TagService.relatedLinks = [];
            vm.relatedLinks = rlTmp;
            tTmp = TagService.tags = [];
            vm.tags = tTmp;
            vm.findOne();
            vm.getTags();
        };

        vm.storiesRecordListInit = function () {
            vm.find();
        };

        vm.predicate = '-created';
        vm.reverse = false;
        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };

        vm.create = function () {

            if (!$scope.storiesForm.$valid) {
                $scope.storiesForm.submitted = true;
                return false;
            }

            var story = new Stories({
                title: vm.title,
                story: strip_tags(vm.story, '<p></p><a></a>'),
                author: vm.author,
                status: vm.status,
                tags: vm.tags,
                relatedLinks: vm.relatedLinks
            });

            story.$save(function () {
                var message = 'Record added!';
                successMessage(message);
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.find = function () {
            vm.story = Stories.query();
        };

        vm.findOne = function () {
            vm.story = Stories.get({
                storyId: $routeParams.storyId
            });
        };

        vm.update = function () {

            vm.story.$update(function () {
                var message = 'Record updated!';
                successMessage(message);
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.delete = function (story) {

            var confirm = window.confirm('Are you sure you want to delete this story?');

            if (confirm) {

                if (story) {
                    story.$remove(function () {
                        for (var i in vm.story) {
                            if (vm.story[i] === story) {
                                vm.story.splice(i, 1);
                            }
                        }
                    });
                } else {
                    vm.story.$remove(function () {
                        var message = 'Record removed!';
                        successMessage(message);
                    });
                }
            }
        };
    };

    StoriesController.$inject = ['$scope', '$location', '$routeParams', '$filter', '$timeout', 'Authentication', 'Stories', 'Tags', 'Flash', 'TagService'];
    angular.module('stories').controller('StoriesController', StoriesController);

}());