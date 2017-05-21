describe('Main', function() {
	var ctrl, Addresses, $scope, httpBackend;
	beforeEach(module('Main'));

	beforeEach(inject(function($rootScope, $controller, $injector, _Addresses_) {
		$scope = $rootScope.$new();
		httpBackend = $injector.get('$httpBackend');
		Addresses = _Addresses_;

		ctrl = $controller('MainController', {$scope: $scope});
	}));

	it('Controller should be defined', function() {
		expect(ctrl).toBeDefined();
	});

	it('Addresses should be request', function() {
		expect(typeof Addresses).toBe('object');
		expect(typeof Addresses.then).toBe('function');

	});

	it('Check if response has addresses and is Kr 19 #1036, Bogotá, Colombia', function() {
		httpBackend.when('GET', 'data/addresses.dat').respond('Kr 19 #1036, Bogotá, Colombia');
		httpBackend.flush();
		expect($scope.addresses.length).toEqual(1);
		expect($scope.addresses).toEqual(['Kr 19 #1036, Bogotá, Colombia']);
	});
});