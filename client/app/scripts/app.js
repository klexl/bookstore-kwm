/**
 * Created by alexk on 14.03.16.
 */
var bookstoreApp = angular.module('bookstore', ['ngRoute']);

// custom filter
angular.module('bookstore').filter('alternatingCase', function () {
    return function (input) {
        var output = '', tmp;

        for (var i = 0; i < input.length; i++) {
            tmp = input.charAt(i);
            if (i % 2 === 0) {
                output += tmp.toUpperCase();
            }
            else {
                output += tmp.toLowerCase();
            }
        }
        return output;
    }
});


// app/index.html#/books/12
bookstoreApp.config(function ($routeProvider) {
    $routeProvider.when('/books/:isbn', {
            templateUrl: 'templates/book_details.html',
            controller: 'BookDetailsCtrl'
        })
        .when('/books', {
            templateUrl: 'templates/book_list.html',
            controller: 'BookListCtrl'
        })
        .when('/admin/books', {
            templateUrl: 'templates/book_list.html',
            controller: 'AdminBookListCtrl'
        })
        .when('/admin/books/:isbn/delete', {
            templateUrl: 'templates/admin/book_delete.html',
            controller: 'AdminDeleteBookCtrl'
        })
        .when('/admin/books/new', {
          templateUrl: 'templates/admin/book_form.html',
            controller: 'AdminNewBookCtrl'
        })
        .when('/admin/books/:isbn/edit', {
            templateUrl: 'templates/admin/book_form.html',
            controller: 'AdminEditBookCtrl'
        })
        .otherwise({
            redirectTo: '/books'
        });
});