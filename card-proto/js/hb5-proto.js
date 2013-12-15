(function() {
    angular.module('hb5-proto', ['localytics.directives', 'ui.bootstrap']).config([
            '$parseProvider', function($parseProvider) {
                return $parseProvider.unwrapPromises(true);
            }
        ]).controller('IndexCtrl', ['$scope', '$q', '$timeout', function($scope, $q, $timeout) {

            $scope.today = function() {
                $scope.buildingConstructionYear = new Date();
                $scope.buildingExitYear = new Date();
            };
            $scope.today();

            $scope.showWeeks = false;
            $scope.toggleWeeks = function () {
                $scope.showWeeks = ! $scope.showWeeks;
            };

            $scope.clear = function () {
                $scope.buildingConstructionYear = null;
                $scope.buildingExitYear = null;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.toggleMin = function() {
                $scope.minDate = ( $scope.minDate ) ? null : new Date();
            };
            $scope.toggleMin();

            $scope.opency = function() {
                $timeout(function() {
                    $scope.cyOpened = true;
                });
            };
            $scope.openey = function() {
                $timeout(function() {
                    $scope.eyOpened = true;
                });
            };

            $scope.dateOptions = {
                'year-format': "'yyyy'",
                'starting-day': 1,
                'close-on-date-selection':true
            };

            $scope.formats = ['yyyy'];
            $scope.format = $scope.formats[0];

            $scope.gridStyle = null;
            $scope.showMap = false;

            var map = L.map('map', {zoomControl:false}).setView([46.99162, 6.93182], 13);
            map.addControl(L.control.zoom({position:'topright'}));

            L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }).addTo(map);

            $scope.changeViewMode = function() {
                if ( $scope.gridStyle === null) {
                    $scope.gridStyle = {"max-width":"768px", "margin":"0"};
                } else {
                    $scope.gridStyle = null;
                }

            }
        }
        ]);

}).call(this);