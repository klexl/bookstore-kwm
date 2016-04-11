"use strict";

bookstoreApp.controller('PublisherListCtrl', function ($scope, BookDataService) {

    BookDataService.getPublishers().then(function (res) {
            $scope.publishers = res.data.publishers;
        },
        function (error) {
            console.log('An error occured: ', error);
        });
});