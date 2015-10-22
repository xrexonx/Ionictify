(function () {
    'use strict';

    angular
        .module('rexonIonicAppControllers')
        .controller('AlbumController', function ($scope, $state, $stateParams, $ionicLoading, $ionicActionSheet, $timeout, Spotify) {

            $ionicLoading.show();

            var vm = $scope;

            vm.artistName = $stateParams.name || 'Rexon';

            vm.actions = {
                getArtistAlbums: function () {

                    Spotify
                        .getArtistsAlbums($stateParams.artistId)
                        .then(function (response) {
                            $ionicLoading.hide();
                            $scope.albums = response.data.items || '';
                        });
                },
                getAlbums: function (iAlbumId) {

                    var id = iAlbumId || $stateParams.albumId;

                    Spotify
                        .getAlbums(id)
                        .then(function (response) {
                            $ionicLoading.hide();
                            $scope.album = response.data;
                        });
                },
                onHold: function (iAlbumId) {
                    console.log(iAlbumId);
                    var hideThis = $ionicActionSheet.show({
                        buttons: [
                            { text: 'Open' },
                            { text: 'Move' },
                            { text: 'Edit' },
                            { text: 'Delete' }
                        ],
                        //destructiveText: 'Delete',
                        titleText: 'Modify Album',
                        //cancelText: 'Cancel',
                        cancel: function() {
                            // add cancel code..
                        },
                        buttonClicked: function(index) {
                            //console.log(index);
                            //console.log($state);
                            $state.go('app.browse');

                            return true;
                        }
                    });

                    $timeout(function() {
                        hideThis();
                    }, 5000);
                },
                onSwipeLeft: function (iAlbumId) {
                    //$state.go('app/getAlbum/'+iAlbumId);

                    alert('Swiped to left.');
                }
            };
            //console.log(vm.actions);
        });

})();