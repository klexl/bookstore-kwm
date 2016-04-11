/**
 * Created by alexk on 11.04.16.
 */
"use strict";

bookstoreApp.controller('AdminNewPublisherCtrl', function ($scope, $location, BookDataService) {
    $scope.publisher = {};
    $scope.submitBtnLabel = 'Verlag anlegen';

    $scope.submitAction = function() {
        BookDataService.storePublisher($scope.publisher).then(function(res){
            goToAdminListView();
        }, function(error){
            console.log('An error occurred!)', error);
        })

    };

    $scope.cancelAction = function() {
        goToAdminListView();
    };

    var goToAdminListView = function() {
        $location.path('/admin/publishers');
    };

});