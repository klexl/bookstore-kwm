/**
 * Created by alexk on 04.04.16.
 */
"use strict";

bookstoreApp.controller("AdminNewBookCtrl", function ($scope, $location, BookDataService) {

    $scope.book = {};
    $scope.isEditMode = false;
    $scope.isAdmin = true;
    $scope.submitBtnLabel = "Buch anlegen";

    // load publisher list from REST
    BookDataService.getPublishers().then(
        function (res) {
            $scope.publishers = res.data.publishers;
        },
        function (error) {
            console.log("Error occured: " + error);
        }
    );

    $scope.submitAction = function () {
        BookDataService.storeBook($scope.book).then(
            function (res) {
                goToAdminListView();
            },
            function (error) {
                console.log("Error occured: " + error);

            }
        );
    }

    $scope.cancelAction = function () {
        goToAdminListView();
    }

    var goToAdminListView = function () {
        $location.path('/admin/books');
    }
});