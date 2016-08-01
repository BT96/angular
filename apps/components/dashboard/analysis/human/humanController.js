LEEDOnApp.controller('humanAnalysisController', function($rootScope, $scope) {
	$rootScope.analysis_header = 'Environment Analysis';
	window.analysisSection = "human";
	document.getElementById("energy_cat_color_angular").style.display    = "none";
	document.getElementById("water_cat_color_angular").style.display     = "none";
	document.getElementById("waste_cat_color_angular").style.display     = "none";
	document.getElementById("human_cat_color_angular").style.display     = "block";
	document.getElementById("transport_cat_color_angular").style.display = "none";

    $(".main_container .analysis_input").show();
    $('.header_analysis_text').html('Environment Analysis');
    $('.analysis_label ').css('height', '200px');
    $('.month_data_below').show();
    $('.month_of_data').css('height', '200px');
    $('.analysis_confidence_level').css('height', '200px');
    $('.analysis_performance_energy_template_img').css('margin-top', '44px'); 
    $('.analysis_performance_energy_template_img').css('width', '15px');
    $('.month_data_below_voc').show();
    $('.month_data_above').attr('class', 'month_data_above');
    $('.month_data_above').addClass('mt20');
   
    var percent_responded = 0;

    var total_occupants = $scope.building_data.occupancy
    $.ajax({
            type: "GET",
            url: "assets/json/environment_summary_" + $scope.leed_id + '.json',
    }).done(function(env_data) {
            var transport_respondents = env_data.responses;
            percent_responded = parseFloat((transport_respondents / total_occupants)*100).toFixed(2);
            if (percent_responded > 100){
                    percent_responded = 100;
            }
    });

    $('#month_of_data_tag').html('% OF PEOPLE RESPONDED');
    $('#month_of_other_data_tag').html('MONTHS OF CO2 DATA');
    $('.analysis_label').addClass('leed-bg-human');
    $('.reduce_by_section').addClass('human-section-color');
    $('.reduce_by_section').html('human');
    $('#reduce_by_container').addClass('w145');
    $('.analysis_performance_energy_template_img').attr('src', 'assets/images/human_gray.svg');
    $('.analysis_dynamic_section_value').attr('src', 'assets/images/human.svg');
    $('#analysisincrease_by_img').attr('src', 'assets/images/human_white.png');
    $('#analysis_CC').hide();
    $('.partition_line_analysis_CC').hide();                

    // var resample_url = getAnalysisData.getResamplingUrl();
    var co2_last_month_data = 0;
    var voc_last_month_data = 0;
    $.ajax({
            url: 'assets/json/voc_resample_' + $scope.leed_id + '.json',
            type: "GET",
    }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                    if (!isNaN(data[i].reading)){
                            co2_last_month_data+=1;
                    }
            };
    });
    $.ajax({
            url: 'assets/json/co2_resample_' + $scope.leed_id + '.json',
            type: "GET",
    }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                    if (!isNaN(data[i].reading)){
                            voc_last_month_data+=1;
                    }
            };
    });

    $.ajax({
            url: 'assets/json/environmentinfo_' + $scope.leed_id + '.json',
            type: "GET",
            dataType: 'jsonp'
    }).done(function(data) {

            getAnalysisData.humanAnalysis_data = data;
            if (data){
                    getAnalysisData.initialize_slider("human");
            }
            $('#analysis_slider_red_emission .ui-slider-handle').html("10%");
            $('#analysis_slider_inc_score .ui-slider-handle').html("+1");

            if (data){
                    if (data['Human Experience Score Uncertainty'] != undefined){
                             if (data['Human ExperienceHuman Experience Score Uncertainty'] < 2){
                                    $('#analysis_confidence_value').html('HIGH');
                                    $('#analysis_confidence_value').css('color', '#95BF58');
                                    $('#analysis_confidence_signal').addClass('confidence-rating-high');
                            }
                            else if(data['Human Experience Score Uncertainty'] < 8){
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

                    $('.therm_meter_color').addClass('leed-bg-human');
                    $('.therm_meter_temp_color').addClass('leed-bg-human');
                    $('.therm_meter_temp_color_voc').addClass('leed-bg-human');

                    $('#analysis_month_data_value').html(percent_responded);
                    $('.therm_meter_color').show();
                    $('.therm_meter_color').animate({ width: percent_responded+'%' }, 2000);

                    // $('#analysis_month_temp_data_value').html(percent_responded);
                    // $('.therm_meter_temp_color').show();
                    // $('.therm_meter_temp_color').animate({ width: percent_responded+'%' }, 2000);

                    // $('#analysis_month_voc_data_value').html(percent_responded);
                    // $('.therm_meter_temp_color').show();
                    // $('.therm_meter_temp_color').animate({ width: percent_responded+'%' }, 2000);
            }

            if (co2_last_month_data){
                    $('#analysis_month_temp_data_value').html(co2_last_month_data);
                    $('.therm_meter_temp_color').show();
                    var data_perc = (parseInt(co2_last_month_data)/12)*100;
                    $('.therm_meter_temp_color').animate({ width: data_perc+'%' }, 2000);
            }

            if (voc_last_month_data){
                    $('#analysis_month_voc_data_value').html(voc_last_month_data);
                    $('.therm_meter_temp_color_voc').show();
                    var data_perc = (parseInt(voc_last_month_data)/12)*100;
                    $('.therm_meter_temp_color_voc').animate({ width: data_perc+'%' }, 2000);
            }

            if (data){
                    if (data['Human Experience Plaque Score with 10% Lower Emissions'] != undefined){
                            $('#analysis_energy_score_dynamic').html(data['Human Experience Plaque Score with 10% Lower Emissions']);
                            var increased_by = parseInt(data['Human Experience Plaque Score with 10% Lower Emissions']) - parseInt(data['Human Experience Plaque Score']);
                            $('#analysis_score_increased_by').html(increased_by);
                    }
                    else{
                            $('#analysis_if_reduce').hide();
                    }

                    var new_val = 'Percent emissions reduction for a plaque score of ' + String(parseInt(data['Human Experience Plaque Score'])+1);
                    if (data[new_val] != undefined){
                            $('#analysis_reduce_emission_by_value').html(data[new_val]);
                    }
                    else{
                            $('#analysis_if_increase').hide();
                    }

                    if (data['Human Experience Plaque Score with 10% Lower Emissions'] == undefined  && data[new_val] == undefined) {
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
            // if(getAnalysisData.last_12_month_score_flag){
            //         getAnalysisData.analysis_last12Month_graph();
            // }
    });
});