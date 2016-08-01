LEEDOnApp.controller('analysisController', function($rootScope, $scope) {
	$rootScope.header = 'Data Analysis';
	window.analysisSection = "energy";
	window.window.getAnalysisData = {	performance_data         : {},
								        energyAnalysis_data      : {},
								        waterAnalysis_data       : {},
								        wasteAnalysis_data       : {},
								        transportAnalysis_data   : {},
								        humanAnalysis_data       : {}
								    };

    $('.main_container').on('change', '.absolute_CC_drp', function() {
        var val_occ = parseFloat($('#mtco2e_occ').html()).toFixed(6);
        var val_SF = parseFloat($('#mtco2e_sq').html()).toFixed(6);
        if ($('.absolute_CC_drp :selected').text() == 'Per year') {
            $('#mtco2e_occ').html(parseFloat((val_occ / 30) * 365).toFixed(2));
            $('#mtco2e_sq').html(parseFloat((val_SF / 30) * 365).toFixed(2));
        } else if ($('.absolute_CC_drp :selected').text() == 'Per month') {
            $('#mtco2e_occ').html(parseFloat((val_occ / 365) * 30).toFixed(2));
            $('#mtco2e_sq').html(parseFloat((val_SF / 365) * 30).toFixed(2));
        }
    });

    $scope.initialize_slider = function (){
    	$("#analysis_slider_red_emission").slider({
	        min: 0,
	        max: 4,
	        value: 1,
	        step: 1,
	        slide: function(event, ui) {

	            if (ui.value < 1 || ui.value > 3) {
	                return false;
	            }

	            if (ui.value == 1) {
	                if (window.analysisSection == "energy") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score with 10% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score with 10% Lower Emissions']) - parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score']);
	                } else if (window.analysisSection == "water") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.waterAnalysis_data['Water Plaque Score with 10% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.waterAnalysis_data['Water Plaque Score with 10% Lower Emissions']) - parseInt(window.getAnalysisData.waterAnalysis_data['Water Plaque Score']);
	                } else if (window.analysisSection == "waste") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score with 10% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score with 10% Lower Emissions']) - parseInt(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score']);
	                } else if (window.analysisSection == "transport") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score with 10% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score with 10% Lower Emissions']) - parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score']);
	                } else if (window.analysisSection == "human") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score with 10% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score with 10% Lower Emissions']) - parseInt(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score']);
	                }
	                var imageUrl = 'assets/images/cloud-slider-white.png';
	                $('#analysis_slider_red_emission .ui-slider-handle').css('background', 'url(' + imageUrl + ') no-repeat');
	                $('#analysis_slider_red_emission .ui-slider-handle').css('opacity', '1');
	                $('#analysis_slider_red_emission .ui-slider-handle').html("10%");
	                $('#analysis_score_increased_by').html(increased_by);
	            } else if (ui.value == 2) {
	                if (window.analysisSection == "energy") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score with 20% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score with 20% Lower Emissions']) - parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score']);
	                } else if (window.analysisSection == "water") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.waterAnalysis_data['Water Plaque Score with 20% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.waterAnalysis_data['Water Plaque Score with 20% Lower Emissions']) - parseInt(window.getAnalysisData.waterAnalysis_data['Water Plaque Score']);
	                } else if (window.analysisSection == "waste") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score with 20% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score with 20% Lower Emissions']) - parseInt(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score']);
	                } else if (window.analysisSection == "transport") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score with 20% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score with 20% Lower Emissions']) - parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score']);
	                } else if (window.analysisSection == "human") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score with 20% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score with 20% Lower Emissions']) - parseInt(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score']);
	                }
	                var imageUrl = 'assets/images/cloud-slider-white.png';
	                $('#analysis_slider_red_emission .ui-slider-handle').css('background', 'url(' + imageUrl + ') no-repeat');
	                $('#analysis_slider_red_emission .ui-slider-handle').css('opacity', '0.7');
	                $('#analysis_slider_red_emission .ui-slider-handle').html("20%");
	                $('#analysis_score_increased_by').html(increased_by);
	            } else if (ui.value == 3) {
	                if (window.analysisSection == "energy") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score with 50% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score with 50% Lower Emissions']) - parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score']);
	                } else if (window.analysisSection == "water") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.waterAnalysis_data['Water Plaque Score with 50% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.waterAnalysis_data['Water Plaque Score with 50% Lower Emissions']) - parseInt(window.getAnalysisData.waterAnalysis_data['Water Plaque Score']);
	                } else if (window.analysisSection == "waste") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score with 50% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score with 50% Lower Emissions']) - parseInt(window.getAnalysisData.wasteAnalysis_data['Waste Plaque Score']);
	                } else if (window.analysisSection == "transport") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score with 50% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score with 50% Lower Emissions']) - parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score']);
	                } else if (window.analysisSection == "human") {
	                    $('#analysis_energy_score_dynamic').html(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score with 50% Lower Emissions']);
	                    var increased_by = parseInt(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score with 50% Lower Emissions']) - parseInt(window.getAnalysisData.humanAnalysis_data['Human Experience Plaque Score']);
	                }
	                var imageUrl = 'assets/images/cloud-slider-transparent.png';
	                $('#analysis_slider_red_emission .ui-slider-handle').css('background', 'url(' + imageUrl + ') no-repeat');
	                $('#analysis_slider_red_emission .ui-slider-handle').css('opacity', '1');
	                $('#analysis_slider_red_emission .ui-slider-handle').html("50%");
	                $('#analysis_score_increased_by').html(increased_by);
	            }
	        }
	    });
    
	    if (window.analysisSection == "energy" || window.analysisSection == "transport") {
	        var numOfTrue = 0;

	        if (window.analysisSection == "energy") {
	            for (var i = 1; i < 100; i++) {
	                if (window.getAnalysisData.energyAnalysis_data['Percent emissions reduction for a plaque score of ' + String(parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score']) + i)]) {
	                    numOfTrue++;
	                } else {
	                    break;
	                }
	            }
	        } else if (window.analysisSection == "transport") {
	            for (var i = 1; i < 100; i++) {
	                if (window.getAnalysisData.transportAnalysis_data['Percent emissions reduction for a plaque score of ' + String(parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score']) + i)]) {
	                    numOfTrue++;
	                } else {
	                    break;
	                }
	            }
	        }

	        $("#analysis_slider_inc_score").slider({
	            min: 0,
	            max: numOfTrue + 1,
	            value: 1,
	            step: 1,
	            slide: function(event, ui) {
	                if (ui.value < 1 || ui.value > numOfTrue) {
	                    return false;
	                }

	                for (var i = 1; i <= numOfTrue; i++) {
	                    if (ui.value == i) {
	                        $('#analysis_slider_inc_score .ui-slider-handle').html("+" + i);
	                        if (window.analysisSection == "energy") {
	                            var new_val = 'Percent emissions reduction for a plaque score of ' + String(parseInt(window.getAnalysisData.energyAnalysis_data['Energy Plaque Score']) + i);
	                            $('#analysis_reduce_emission_by_value').html(window.getAnalysisData.energyAnalysis_data[new_val]);
	                        } else if (window.analysisSection == "transport") {
	                            var new_val = 'Percent emissions reduction for a plaque score of ' + String(parseInt(window.getAnalysisData.transportAnalysis_data['Transportation Plaque Score']) + i);
	                            $('#analysis_reduce_emission_by_value').html(window.getAnalysisData.transportAnalysis_data[new_val]);
	                        }
	                    }
	                };
	            }
	        });
	    }
	};
});