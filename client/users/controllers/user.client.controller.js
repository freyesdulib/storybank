(function () {

    'use strict';

    var UserController = function ($scope, $location, $routeParams, $filter, $timeout, Authentication, User, Flash) {

        var vm = this;
        vm.authentication = Authentication;

        var successMessage = function(successMessage) {
            $('form').hide();
            var message = '<strong><span class="glyphicon glyphicon-ok">&nbsp;' + successMessage + '</span></strong>';
            Flash.create('success', message, 'custom-class');
            parent.scrollTo(0, 0);
            $timeout(function() {
                $location.path('users');
            }, 5000);
        };

        vm.predicate = 'status';
        vm.reverse = false;
        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };

        vm.create = function () {

            if (!$scope.userForm.$valid) {
                $scope.userForm.submitted = true;
                return false;
            }

            var user = new User({
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                username: vm.username,
                status: vm.status,
                role: vm.role
            });

            user.$save(function () {
                var message = 'Record added!';
                successMessage(message);
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.find = function () {
            vm.users = User.query();
        };

        vm.findOne = function () {
            vm.user = User.get({
                userId: $routeParams.userId
            });
        };

        vm.update = function () {
            vm.user.$update(function () {
                var message = 'Record updated!';
                successMessage(message);
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.delete = function (user) {

            if (user) {

                user.$remove(function () {
                    for (var i in vm.user) {
                        if (vm.user[i] === user) {
                            vm.user.splice(i, 1);
                        }
                    }
                });
            } else {
                vm.user.$remove(function () {
                    var message = 'Record removed!';
                    successMessage(message);
                });
            }
        };
    };

    UserController.$inject = ['$scope', '$location', '$routeParams', '$filter', '$timeout', 'Authentication', 'User', 'Flash'];
    angular.module('users').controller('UserController', UserController);

}());