LEEDOnApp.controller('wasteController', function($rootScope, $scope) {
	$rootScope.header = 'Waste';
	$rootScope.main_appClass = '';
	document.getElementById("energy_cat_color_angular").style.display    = "none";
	document.getElementById("water_cat_color_angular").style.display     = "none";
	document.getElementById("waste_cat_color_angular").style.display     = "block";
	document.getElementById("human_cat_color_angular").style.display     = "none";
	document.getElementById("transport_cat_color_angular").style.display = "none";
});