/**
 * Created by alexk on 14.03.16.
 */
/*
 Fehlerwarnung, uninitierte Variablenwarnung
 */
"use strict";

bookstoreApp.controller('BookDetailsCtrl', function ($scope, $routeParams, BookDataService) {

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


    // Get our books from the service to keep our controller free from data
    // var currentIsbn = $routeParams.isbn;
    $scope.book = BookDataService.getBookByIsbn(currentIsbn);
    
    

// $scope.book = getBook();
//
// function getBook() {
//     var currentIsbn = $routeParams.isbn;
//     for (var i = 0; i < $scope.books.length; i++){
//         if ($scope.books[i].isbn == currentIsbn)
//             return $scope.books[i];
//     }
// }

// $scope.book = {
//     title: 'JavaScript für Enterprise-Entwickler',
//     subtitle: 'Professionell programmieren im Browser und auf dem Server',
//     isbn: '978-3-89864-728-1',
//     abstract: 'JavaScript ist längst nicht mehr nur für klassische Webprogrammierer interessant.',
//     numPages: 302,
//     author: 'Oliver Ochs',
//     publisher: {
//         name: 'dpunkt.verlag',
//         url: 'http://dpunkt.de/'
//     }
// };
})
;