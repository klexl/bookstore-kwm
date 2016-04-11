/**
 * Created by alexk on 14.03.16.
 */
var bookstoreApp = angular.module('bookstore', ['ngRoute', 'ngCookies']);

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
        .when('/admin/publishers/', {
            templateUrl: 'templates/admin/publisher_list.html',
            controller: 'PublisherListCtrl'
        })
        .when('/admin/publishers/new', {
            templateUrl: 'templates/admin/publisher_form.html',
            controller: 'AdminNewPublisherCtrl'
        })
        .when('/admin/publishers/:id/edit', {
            templateUrl: 'templates/admin/publisher_form.html',
            controller: 'PublisherEditCtrl'
        })
        .otherwise({
            redirectTo: '/books'
        });
});

bookstoreApp.run(function ($rootScope, $location, $cookieStore, $http) {
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.authdata;
    }
    // jQuery .on, Angular $on
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var restrictedPage = $location.path().indexOf("/admin") != -1;
        console.log(restrictedPage);
        var loggedIn = $rootScope.globals.currentUser;
        if(restrictedPage && !loggedIn)
            $location.path('/books');
    });
});

// schaut jeden Request an, kontrolliert ob ein 200-Code zurückkommt, wenn 401 zurückkommt (Login failed) wird ein error ausgegeben
bookstoreApp.factory("HttpErrorInterceptorService", ["$q", "$rootScope", "$location","FlashService",
    function($q, $rootScope, $location,FlashService) {
        var success = function(response) {
                // pass through
                return response;
            },
            error = function(response) {
                if(response.status === 401) {
                    FlashService.Error(response.data.message);
                }

                return $q.reject(response);
            };

        return function(httpPromise) {
            return httpPromise.then(success, error);
        };
    }
]).config(["$httpProvider",
    function($httpProvider) {
        $httpProvider.responseInterceptors.push("HttpErrorInterceptorService");
    }
]);