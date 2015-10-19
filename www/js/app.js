(function () {

    'use strict';

    var app = angular.module('rexonIonicApp', [
        'ionic',
        'rexonIonicAppServices',
        'rexonIonicAppControllers'
    ]);

    app.constant('$ionicLoadingConfig', {
        template: 'Loading...'
    });


    app.run(function ($ionicPlatform, $ionicPopup) {

        $ionicPlatform.ready(function () {

            //Check if has internet connection
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

    });

    app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html'
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })
            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.artists', {
                resolve: {
                    aResolvedData : function (Spotify) {
                        return Spotify.resolveData();
                    }
                },
                url: '/artists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/artists.html',
                        controller: 'ArtistsController'
                    }
                }
            })
            .state('app.albums', {
                url: '/artist/:artistId/:name',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/artist.html',
                        controller: 'AlbumController'
                    }
                }
            })
            .state('app.getAlbum', {
                url: '/album/:albumId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/album.html',
                        controller: 'AlbumController'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/artists');
    });

    app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });

    angular.module('rexonIonicAppServices', []);
    angular.module('rexonIonicAppControllers', []);

})();
