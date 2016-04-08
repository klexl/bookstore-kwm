/**
 * Created by alexk on 04.04.16.
 */
/**
 * Created by alexk on 04.04.16.
 */
"use strict";

bookstoreApp.controller('AdminBookListCtrl', function ($scope, $location, BookDataService) {

    BookDataService.getBooks().then(
        // promise succes
        function (res) {
            $scope.books = res.data.books;
        },
        // promise failed
        function (error) {
            console.log('An error occured!' + " " + error);
        }
    );

    $scope.isAdmin = true;
});