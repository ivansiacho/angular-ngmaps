(function () {
'use strict';
//Load module
angular.module('Main', ['ngResource', 'ngMap'])
	.controller('MainController', function($scope, Addresses, NgMap) {
		// Get the response and split by line break
		Addresses.then(function(response) {
			$scope.addresses = response.data.split('\n');
		});
		// Add NgMap dependency for create map and add marker/button events
		NgMap.getMap().then(function(map) {
			var resetCoordinates = [[0, 0], [0, 0]];
			var mapMarkers = map.markers;
    		mapMarkers.logo.setMap(null);
    		$scope.iconMarker = {
    			"url": "http://is1.mzstatic.com/image/thumb/Purple71/v4/b6/e9/b4/b6e9b4f1-3756-6dfb-ac23-2e59b671b985/source/175x175bb.jpg",
    			"scaledSize": [50, 50]
    		};
		    $scope.onMarkerClick = function(event) {
				var distance;
				var nearestMarker;
				var middlePoint;
				var distances = [];
		    	var latLng = event.latLng;
				var mapShapes = map.shapes;
		    	var coordinates = [latLng.lat(), latLng.lng()];

	    		$scope.iconCoordinates = coordinates;

	    		// reset coordinates and remove lines and logo
		    	$scope.onRemoveLine = function() {
		    		$scope.coordinates = resetCoordinates;
		    		$scope.firstCoordinates = undefined;
		    		$scope.iconCoordinates = undefined;
		    		mapShapes.line.setMap(null);
		    		mapMarkers.logo.setMap(null);
		    	};

		    	// Check if has preview coordinates for add a linepath
		    	if (!$scope.firstCoordinates) {
			    	$scope.firstCoordinates = coordinates;
		    	} else {
		    		$scope.coordinates = [$scope.firstCoordinates, coordinates];
		    		mapShapes.line.setMap(map);
		    	}

		    	// Check if logo is checked for add a logo image
		    	if ($scope.iconCoordinates && $scope.isLogoChecked) {
		    		// Calculate the nearest marker and get the midpoint
		    		// between current and nearest markers
		    		for (var key in mapMarkers) {
		    			distance = google.maps.geometry.spherical.computeDistanceBetween(latLng, mapMarkers[key].position);
		    			if (distance > 0) {
		    				distances.push({distance: distance, latLng: mapMarkers[key].position});
		    			}
		    		}

		    		nearestMarker = distances.sort(function(arrayA, arrayB){
		    			return arrayA.distance - arrayB.distance;
		    		});
		    		middlePoint = google.maps.geometry.spherical.interpolate(latLng, nearestMarker[0].latLng, 0.5);

		    		// Once the mid point is calculate add logo in those coordinates
		    		$scope.iconCoordinates = [middlePoint.lat(), middlePoint.lng()];
		    		mapMarkers.logo.setMap(map);
		    	}
		    };
		});
	})
	.factory('Addresses', function($http) {
		// make the request
		return $http.get('data/addresses.dat');
	});
})();