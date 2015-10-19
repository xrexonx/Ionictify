(function () {
    'use strict';

    angular
        .module('rexonIonicAppControllers')
        .controller('ArtistsController', function ($scope,  aResolvedData) {

            $scope.artists = aResolvedData.artists;

        });

})();