/**
 * Created by alexk on 04.04.16.
 */
bookstoreApp.factory('BookDataService', function($http, $rootScope, CONFIG){
    var srv = {};

    srv._baseUrl = CONFIG.serverUrl;

    srv.storeBook = function(book) {
        return $http.post(srv._baseUrl + "api/books", book);
    }

    srv.updateBook = function(book) {
        return $http.put(srv._baseUrl + "api/books/isbn/" + book.isbn + ".json", book);
    }

    srv.deleteBookByIsbn = function (isbn) {
        return $http.delete(srv._baseUrl + "api/books/isbn/" + isbn + ".json");
    }

    srv.getBooks = function() {
        return $http.get(srv._baseUrl + "api/books.json");
    }

    srv.getBookByIsbn = function(isbn) {
        return $http.get(srv._baseUrl + "api/books/isbn/" + isbn + ".json");
    }

    srv.getPublishers = function() {
        return $http.get(srv._baseUrl + "api/publishers.json");
    }

    srv.getPublisherById = function (id) {
        return $http.get(srv._baseUrl + "api/publishers/" + id + ".json");
    }

    srv.storePublisher = function(publisher) {
        return $http.post(srv._baseUrl + "api/publishers", publisher);
    }

    srv.updatePublisher = function(publisher) {
        return $http.put(srv._baseUrl + "api/publishers/" + publisher.id + ".json", publisher);
    }

    return {
        getBookByIsbn : function(isbn) {
            return srv.getBookByIsbn(isbn);
        },
        getBooks : function() {
            return srv.getBooks();
        },
        storeBook : function(book) {
            return srv.storeBook(book);
        },
        updateBook : function(book) {
            return srv.updateBook(book);
        },
        deleteBookByIsbn : function(isbn) {
            return srv.deleteBookByIsbn(isbn);
        },
        getPublishers : function () {
            return srv.getPublishers();
        },
        getPublisherById : function (id) {
            return srv.getPublisherById(id);
        },
        storePublisher : function (publisher) {
            return srv.storePublisher(publisher);
        },
        updatePublisher : function (id) {
            return srv.updatePublisher(id);
        }
    }
});