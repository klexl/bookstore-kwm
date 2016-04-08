"use strict";

bookstoreApp.controller("AdminDeleteBookCtrl", function ($scope, $routeParams, $location, BookDataService) {

    var currentIsbn = $routeParams.isbn;

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

    $scope.deleteBook = function (isbn) {
        BookDataService.deleteBookByIsbn(isbn).then(
            function () {
                goToAdminListView();
            },
            function (error) {
                console.log("Error occured: " + error);
            }
        )
    };

    $scope.cancel = function () {
        goToAdminListView();
    }

    var goToAdminListView = function () {
        $location.path('/admin/books');
    }


});