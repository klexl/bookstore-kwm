/**
 * Created by alexk on 04.04.16.
 */
"use strict";

bookstoreApp.controller("AdminEditBookCtrl", function ($scope, $routeParams, $location, BookDataService) {

    var currentIsbn = $routeParams.isbn;
    $scope.isEditMode = true;
    $scope.isAdmin = true;
    $scope.book = {};
    $scope.submitBtnLabel = "Änderungen speichern";

    // load publisher list from REST
    BookDataService.getPublishers().then(
        function (res) {
            $scope.publishers = res.data.publishers;
        },
        function (error) {
            console.log("Error occured: " + error);
        }
    );

    BookDataService.getBookByIsbn(currentIsbn).then(
        // promise success
        function (res) {
            $scope.book = res.data.book[0];
        },
        // promise failed
        function (error) {
            console.log('An error occured!' + " " + error);
        }
    );

    $scope.submitAction = function () {

        $scope.book.publisher_id = $scope.book.publisher.id;

        console.log($scope.book.publisher_id);

        BookDataService.updateBook($scope.book).then(
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