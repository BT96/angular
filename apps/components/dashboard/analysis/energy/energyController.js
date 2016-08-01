LEEDOnApp.controller('energyAnalysisController', function($rootScope, $scope) {
	$rootScope.analysis_header = 'Energy Analysis';
	document.getElementById("energy_cat_color_angular").style.display    = "block";
	document.getElementById("water_cat_color_angular").style.display     = "none";
	document.getElementById("waste_cat_color_angular").style.display     = "none";
	document.getElementById("human_cat_color_angular").style.display     = "none";
	document.getElementById("transport_cat_color_angular").style.display = "none";

    $(".main_container .analysis_input").show();
    $('.header_analysis_text').html('Energy Analysis');
    $('.month_data_above').attr('class', 'month_data_above');
    $('#month_of_other_data_tag').html('MONTHS OF TEMPERATURE DATA');
    $('.month_data_below').show();
    $('.month_data_below_voc').hide();
    $('.month_data_above').addClass('mt50');
    $('.analysis_label').addClass('leed-bg-energy');
    $('.reduce_by_section').addClass('energy-section-color');
    $('.reduce_by_section').html('energy');
    $('.analysis_performance_energy_template_img').attr('src', 'assets/images/energy_gray.svg');
    $('.analysis_dynamic_section_value').attr('src', 'assets/images/energy.svg');
    $('#analysisincrease_by_img').attr('src', 'assets/images/energy_white.png');

    $.ajax({
        url: 'assets/json/energyinfo_' + $scope.leed_id + '.json',
        type: "GET",
    }).done(function(data) {

        window.getAnalysisData.energyAnalysis_data = data;
        if (data){
                setTimeout(function(){
                    $scope.initialize_slider("energy");
                }, 1000);
        }
        $('#analysis_slider_red_emission .ui-slider-handle').html("10%");
        $('#analysis_slider_inc_score .ui-slider-handle').html("+1");

        if (data) {
                var mtco2_per_occupant = parseFloat(Number(data['Adjusted Emissions per Occupant'])).toFixed(6);
                var mtco2_per_SF       = parseFloat(Number(data['Adjusted Emissions per SF'])).toFixed(6);
                $('#mtco2e_occ').html(parseFloat(mtco2_per_occupant *365).toFixed(2));
                $('#mtco2e_sq').html(parseFloat(mtco2_per_SF *365).toFixed(2));

                if ( data['Adjusted Emissions per Occupant'] == undefined){
                        $('.mtco2e_occ_main').hide();
                        $('.mtco2e_sq_main').addClass('ml25p');
                }

                if ( data['Adjusted Emissions per SF'] == undefined) {
                        $('.mtco2e_sq_main').hide();
                        $('.mtco2e_occ_main').addClass('ml25p');
                }

                if ( data['Adjusted Emissions per Occupant'] == undefined && data['Adjusted Emissions per SF'] == undefined) {
                        $('#analysis_CC').hide();
                        $('.partition_line_analysis_CC').hide();
                }
        }
        else{
                $('#analysis_CC').hide();
                $('.partition_line_analysis_CC').hide();
        }

        if (data){
                if (data['Energy Score Uncertainty'] != undefined){
                         if (data['Energy Score Uncertainty'] < 2){
                                $('#analysis_confidence_value').html('HIGH');
                                $('#analysis_confidence_value').css('color', '#95BF58');
                                $('#analysis_confidence_signal').addClass('confidence-rating-high');
                        }
                        else if(data['Energy Score Uncertainty'] < 8){
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

                $('.therm_meter_color').addClass('leed-bg-energy');
                $('.therm_meter_temp_color').addClass('leed-bg-energy');

                if (data['Months of Energy Data'] != undefined){
                        $('#analysis_month_data_value').html(data['Months of Energy Data']);
                        $('.therm_meter_color').show();
                        var data_perc = (parseInt($('#analysis_month_data_value').html())/12)*100;
                        $('.therm_meter_color').animate({ width: data_perc+'%' }, 2000);
                }

                if (data['Months of Temperature Data'] != undefined){
                        $('#analysis_month_temp_data_value').html(data['Months of Temperature Data']);
                        $('.therm_meter_temp_color').show();
                        var data_perc = (parseInt($('#analysis_month_temp_data_value').html())/12)*100;
                        $('.therm_meter_temp_color').animate({ width: data_perc+'%' }, 2000);
                }
        }

        if (data){
                if (data['Energy Plaque Score with 10% Lower Emissions'] != undefined){
                        $('#analysis_energy_score_dynamic').html(data['Energy Plaque Score with 10% Lower Emissions']);
                        var increased_by = parseInt(data['Energy Plaque Score with 10% Lower Emissions']) - parseInt(data['Energy Plaque Score']);
                        $('#analysis_score_increased_by').html(increased_by);
                }
                else{
                        $('#analysis_if_reduce').hide();
                }

                var new_val = 'Percent emissions reduction for a plaque score of ' + String(parseInt(data['Energy Plaque Score'])+1);
                if (data[new_val] != undefined){
                        $('#analysis_reduce_emission_by_value').html(data[new_val]);
                }
                else{
                        $('#analysis_if_increase').hide();
                }

                if (data['Energy Plaque Score with 10% Lower Emissions'] == undefined  && data[new_val] == undefined) {
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

        // if(window.getAnalysisData.last_12_month_score_flag){
        //     window.getAnalysisData.analysis_last12Month_graph();
        // }
    }).fail(function(data) {
            // if(window.getAnalysisData.last_12_month_score_flag){
            //         window.getAnalysisData.analysis_last12Month_graph();
            // }
    });
});