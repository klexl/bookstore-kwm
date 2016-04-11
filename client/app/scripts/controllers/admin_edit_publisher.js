/**
 * Created by alexk on 11.04.16.
 */
"use strict";

bookstoreApp.controller('PublisherEditCtrl', function ($scope,$routeParams, $location, BookDataService) {

    $scope.isEditMode = true;
    $scope.submitBtnLabel = 'Verlag editieren';

    var id = $routeParams.id;
    BookDataService.getPublisherById(id).then(function(res) {
        $scope.publisher = res.data.publisher;
    }, function(error) {
        console.log('An error occurred!', error);
    });

    $scope.submitAction = function() {
        BookDataService.updatePublisher($scope.publisher).then(function(res){
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
});"use strict";

bookstoreApp.controller('PublisherEditCtrl', function ($scope,$routeParams, $location, BookDataService) {

    $scope.isEditMode = true;
    $scope.submitBtnLabel = 'Verlag editieren';

    var id = $routeParams.id;
    BookDataService.getPublisherById(id).then(function(res) {
        $scope.publisher = res.data.publisher;
    }, function(error) {
        console.log('An error occurred!', error);
    });

    $scope.submitAction = function() {
        BookDataService.updatePublisher($scope.publisher).then(function(res){
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
});"use strict";

bookstoreApp.controller('PublisherEditCtrl', function ($scope,$routeParams, $location, BookDataService) {

    $scope.isEditMode = true;
    $scope.submitBtnLabel = 'Verlag editieren';

    var id = $routeParams.id;
    BookDataService.getPublisherById(id).then(function(res) {
        $scope.publisher = res.data.publisher;
    }, function(error) {
        console.log('An error occurred!', error);
    });

    $scope.submitAction = function() {
        BookDataService.updatePublisher($scope.publisher).then(function(res){
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
});"use strict";

bookstoreApp.controller('PublisherEditCtrl', function ($scope,$routeParams, $location, BookDataService) {

    $scope.isEditMode = true;
    $scope.submitBtnLabel = 'Verlag editieren';

    var id = $routeParams.id;
    BookDataService.getPublisherById(id).then(function(res) {
        $scope.publisher = res.data.publisher;
    }, function(error) {
        console.log('An error occurred!', error);
    });

    $scope.submitAction = function() {
        BookDataService.updatePublisher($scope.publisher).then(function(res){
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