(function () {
    'use strict';

    angular
        .module('rexonIonicAppServices')
        .service('Spotify', function($http, $q) {

            var $this     = this;
            var _BaseAPI  = 'https://api.spotify.com/v1/';
            var _ajaxSend = function(endpoint, method, data, params, headers) {

                return $http({
                    url     : _BaseAPI + endpoint,
                    method  : method || 'GET',
                    headers : headers || {'Content-Type': 'application/x-www-form-urlencoded' },
                    data    : data || '',
                    params  : params || '',
                    cache   : true
                });
            };

            $this.actions = {
                getArtistsList: function () {
                    /* static test data artists id for testing */
                    var  $sIds = '3DY26PgCL4tKVUPQBtBWei,159qqlGwzE04xyqpfAwRLo,5p9CTsn5ueGU4oScNX1axu,4LjQpQc5NB5G02zqfEIex7,0rsHKddRhuze38fVL0egOY,1C62FV9Cltn9L4c9jAwCyk,7t2C8WwLyKUKRe0LVh8zl9,4NiJW4q9ichVqL1aUsgGAN,3WfJ1OtrWI7RViX9DMyEGy';
                    var urlTo = 'artists/?ids=' + $sIds;
                    return _ajaxSend(urlTo, 'GET', '');
                },
                getArtists: function (iArtistId) {
                    var urlTo = 'artists/' + iArtistId;
                    return _ajaxSend(urlTo, 'GET', '');
                },
                getAlbums: function (iAlbumId) {
                    var urlTo = 'albums/' + iAlbumId;
                    return _ajaxSend(urlTo, 'GET', '');
                },
                getArtistsAlbums: function (iArtistId) {
                    var urlTo = 'artists/' + iArtistId + '/albums';
                    return _ajaxSend(urlTo, 'GET', '');
                },
                getAlbumTracks: function (iAlbumId) {
                    var urlTo = 'albums/' + iAlbumId + '/tracks';
                    return _ajaxSend(urlTo, 'GET', '');
                },
                resolveData: function () {
                    var deferred = $q.defer();
                    $this.actions
                        .getArtistsList()
                        .success( function (response) {
                            deferred.resolve(response);
                        });
                    return deferred.promise;
                }
            };

            return($this.actions);
        });

})();