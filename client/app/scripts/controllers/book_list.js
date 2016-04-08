/**
 * Created by alexk on 04.04.16.
 */
"use strict";

bookstoreApp.controller('BookListCtrl', function ($scope, BookDataService) {

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
    
    //
    // $scope.books = [
    //     {
    //     title: 'JavaScript für Dummies',
    //     subtitle: 'Dumm programmieren im Browser und auf dem Server',
    //     isbn: '978-3-89864-728-2',
    //     abstract: 'JavaScript ist längst nicht mehr nur für klassische Webprogrammierer interessant.',
    //     numPages: 300,
    //     author: 'Oliver Ochs',
    //     publisher: {
    //         name: 'dpunkt.verlag',
    //         url: 'http://dpunkt.de/'
    //     }
    // },
    // {
    //     title: 'JavaScript für Lulu-Entwickler',
    //     subtitle: 'Schwul programmieren im Browser und auf dem Server',
    //     isbn: '979-3-89864-728-3',
    //     abstract: 'JavaScript ist längst nicht mehr nur für klassische Webprogrammierer interessant.',
    //     numPages: 322,
    //     author: 'Oliver Ochs',
    //     publisher: {
    //         name: 'dpunkt.verlag',
    //         url: 'http://dpunkt.de/'
    //     }
    // },
    // {
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
    // }];
});