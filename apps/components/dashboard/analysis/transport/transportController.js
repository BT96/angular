LEEDOnApp.controller('transportAnalysisController', function($rootScope, $scope) {
	$rootScope.analysis_header = 'Transit Analysis';
	window.analysisSection = "transport";
	document.getElementById("energy_cat_color_angular").style.display    = "none";
	document.getElementById("water_cat_color_angular").style.display     = "none";
	document.getElementById("waste_cat_color_angular").style.display     = "none";
	document.getElementById("human_cat_color_angular").style.display     = "none";
	document.getElementById("transport_cat_color_angular").style.display = "block";

    $(".main_container .analysis_input").show();
    $('.header_analysis_text').html('Transit Analysis');

    var percent_responded = 0;
    var total_occupants = $scope.building_data.occupancy
    $.ajax({
            type: "GET",
            url: "assets/json/transit_summary_" + $scope.leed_id + '.json',
    }).done(function(transit_data) {
            var transport_respondents = transit_data.responses;
            percent_responded = parseFloat((transport_respondents / total_occupants)*100).toFixed(2);
            if (percent_responded > 100){
                    percent_responded = 100;
            }
    });
    $('.month_data_below').hide();
    $('.month_data_below_voc').hide();
    $('.month_data_above').attr('class', 'month_data_above');
    $('.month_data_above').addClass('mt65');
    $('#month_of_data_tag').html('% OF PEOPLE RESPONDED');
    $('.analysis_label').addClass('leed-bg-transport');
    $('.reduce_by_section').addClass('transport-section-color');
    $('.reduce_by_section').html('transportation');
    $('#reduce_by_container').addClass('w145');
    $('.analysis_performance_energy_template_img').attr('src', 'assets/images/transport_gray.svg');
    $('.analysis_performance_energy_template_img').css('width', '25px');
    $('.analysis_dynamic_section_value').attr('src', 'assets/images/transport.svg');
    $('#analysisincrease_by_img').attr('src', 'assets/images/transport_white.png');
    $('#analysis_CC').hide();
    $('.partition_line_analysis_CC').hide();
    $('.analysis_total_score_container').css('color', '#4F4A5A');

    $.ajax({
            url: 'assets/json/transitinfo_' + $scope.leed_id + '.json',
            type: "GET",
    }).done(function(data) {

            window.getAnalysisData.transportAnalysis_data = data;
            if (data){
            	setTimeout(function(){
                    $scope.initialize_slider("transport");
                }, 1000);
            }
            $('#analysis_slider_red_emission .ui-slider-handle').html("10%");
            $('#analysis_slider_inc_score .ui-slider-handle').html("+1");

            if (data){
                    if (data['Transportation Score Uncertainty'] != undefined){
                             if (data['Transportation Score Uncertainty'] < 2){
                                    $('#analysis_confidence_value').html('HIGH');
                                    $('#analysis_confidence_value').css('color', '#95BF58');
                                    $('#analysis_confidence_signal').addClass('confidence-rating-high');
                            }
                            else if(data['Transportation Score Uncertainty'] < 8){
                                    $('#analysis_confidence_value').html('MEDIUM');
                                    $('#analysis_confidence_value').css('color', '#FCD603' );
                                    $('#analysis_confidence_signal').addClass('confidence-rating-medium');
                            }
                            else {
                                    $('#analysis_confidence_value').html('LOW');
                                    $('#analysis_confidence_value').css('color', '#FF736D' );
                                    $('#analysis_confidence_signal').addClass('confidence-rating-low');
                            }
                    }
                    else{
                            $('#conf_level_container').hide();
                            $('#month_of_data_container').attr('class', 'col-md-9');
                    }
            }
            else{
                    $('#conf_level_container').hide();
                    $('#month_of_data_container').attr('class', 'col-md-9');
            }

            if (data){

                    $('.therm_meter_color').addClass('leed-bg-transport');
                    $('#analysis_month_data_value').html(percent_responded);
                    $('.therm_meter_color').show();
                    $('.therm_meter_color').animate({ width: percent_responded+'%' }, 2000);
            }

            if (data){
                    if (data['Transportation Plaque Score with 10% Lower Emissions'] != undefined){
                            $('#analysis_energy_score_dynamic').html(data['Transportation Plaque Score with 10% Lower Emissions']);
                            var increased_by = parseInt(data['Transportation Plaque Score with 10% Lower Emissions']) - parseInt(data['Transportation Plaque Score']);
                            $('#analysis_score_increased_by').html(increased_by);
                    }
                    else{
                            $('#analysis_if_reduce').hide();
                    }

                    var new_val = 'Percent emissions reduction for a plaque score of ' + String(parseInt(data['Transportation Plaque Score'])+1);
                    if (data[new_val] != undefined){
                            $('#analysis_reduce_emission_by_value').html(data[new_val]);
                    }
                    else{
                            $('#analysis_if_increase').hide();
                    }

                    if (data['Transportation Plaque Score with 10% Lower Emissions'] == undefined  && data[new_val] == undefined) {
                            $('#analysis_tool').hide();
                            $('.partition_line_analysis_if').hide();
                    }
            }
            else{
                    $('#analysis_tool').hide();
                    $('.partition_line_analysis_if').hide();
                    $('#analysis_if_reduce').hide();
                    $('#analysis_if_increase').hide();
            }

            // if(getAnalysisData.last_12_month_score_flag){
            //         getAnalysisData.analysis_last12Month_graph();
            // }
    }).fail(function(data) {
            // getAnalysisData.endLoader();
            //         getAnalysisData.analysis_last12Month_graph();
            // }
    });
});