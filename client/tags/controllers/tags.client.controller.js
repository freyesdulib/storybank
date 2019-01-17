(function () {

    'use strict';

    var TagsController = function ($scope, $location, $routeParams, $filter, $timeout, Authentication, User, Tags, Flash) {

        var vm = this;
        vm.authentication = Authentication;

        var successMessage = function(successMessage) {
            $('form').hide();
            var message = '<strong><span class="glyphicon glyphicon-ok">&nbsp;' + successMessage + '</span></strong>';
            Flash.create('success', message, 'custom-class');
            parent.scrollTo(0, 0);
            $timeout(function() {
                $location.path('tags');
            }, 5000);
        };

        vm.predicate = 'name';
        vm.reverse = false;
        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };

        vm.create = function () {

            if (!$scope.tagsForm.$valid) {
                $scope.tagsForm.submitted = true;
                return false;
            }

            var tag = new Tags({
                name: vm.name,
                description: vm.description
            });

            tag.$save(function () {
                var message = 'Record added!';
                successMessage(message);
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.find = function () {
            vm.tags = Tags.query();
        };

        vm.findOne = function () {
            vm.tag = Tags.get({
                tagId: $routeParams.tagId
            });
        };

        vm.update = function () {
            vm.tag.$update(function () {
                var message = 'Record updated!';
                successMessage(message);
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.delete = function (tag) {

            var confirm = window.confirm('Are you sure you want to delete this tag?');

            if (confirm) {

                if (tag) {

                    tag.$remove(function () {

                        for (var i in vm.tag) {
                            if (vm.tag[i] === tag) {
                                vm.tag.splice(i, 1);
                            }
                        }
                    });
                } else {
                    vm.tag.$remove(function () {
                        var message = 'Record removed!';
                        successMessage(message);
                    });
                }
            }
        };
    };

    TagsController.$inject = ['$scope', '$location', '$routeParams', '$filter', '$timeout', 'Authentication', 'User', 'Tags', 'Flash'];
    angular.module('tags').controller('TagsController', TagsController);

}());