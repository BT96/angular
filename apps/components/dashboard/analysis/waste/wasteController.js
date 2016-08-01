LEEDOnApp.controller('wasteAnalysisController', function($rootScope, $scope) {
	$rootScope.analysis_header = 'Waste Analysis';
	window.analysisSection = "waste";
	document.getElementById("energy_cat_color_angular").style.display    = "none";
	document.getElementById("water_cat_color_angular").style.display     = "none";
	document.getElementById("waste_cat_color_angular").style.display     = "block";
	document.getElementById("human_cat_color_angular").style.display     = "none";
	document.getElementById("transport_cat_color_angular").style.display = "none";

    $(".main_container .analysis_input").show();
    $('.header_analysis_text').html('Waste Analysis');
    $('.month_data_below').hide();
    $('.month_data_below_voc').hide();
    $('.month_data_above').attr('class', 'month_data_above');
    $('.month_data_above').addClass('mt65');
    $('#absolute_consumption_header').html("GENERATED & UNDIVERTED WASTE");
    $('#mtco2e_sq_icon').attr('src', 'assets/images/human-grey.svg');
    $('#mtco2e_sq_icon').removeClass('w10').addClass('w18');
    $('#absolute_consumption_occ').html("lbs/occupant");
    $('#absolute_consumption_SF').html("lbs/occupant");
    $('#month_of_data_tag').html('MONTHS OF WASTE DATA');
    $('.analysis_label').addClass('leed-bg-waste');
    $('#analysis_if_increase').hide();
    $('.reduce_by_section').addClass('waste-section-color');
    $('.reduce_by_section').html('waste');
    $('.analysis_performance_energy_template_img').attr('src', 'assets/images/waste_gray.svg');
    $('.analysis_performance_energy_template_img').css('width', '25px');
    $('.analysis_dynamic_section_value').attr('src', 'assets/images/waste.svg');
    $('#analysisincrease_by_img').attr('src', 'assets/images/waste_white.png');                

    // var resample_url = getAnalysisData.getResamplingUrl();
    var waste_last_month_data = 0;
    $.ajax({
            url: 'assets/json/waste_generated_' + $scope.leed_id + '.json',
            type: "GET",
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
            if (!isNaN(data[i].reading)){
                    waste_last_month_data+=1;
            }
        };
    });

    $.ajax({
            url: 'assets/json/wasteinfo_' + $scope.leed_id + '.json',
            type: "GET",
    }).done(function(data) {

            window.getAnalysisData.wasteAnalysis_data = data;
            if (data){
            	setTimeout(function(){
                    $scope.initialize_slider("waste");
                }, 1000);
            }
            $('#analysis_slider_red_emission .ui-slider-handle').html("10%");

            if (data) {
                    var mtco2_per_occupant = parseFloat(Number(data['Generated Waste (lbs per occupant per day)'])).toFixed(6);
                    var mtco2_per_SF       = parseFloat(Number(data['Undiverted Waste (lbs per occupant per day)'])).toFixed(6);
                    $('#mtco2e_occ').html(parseFloat(mtco2_per_occupant *365).toFixed(2));
                    $('#mtco2e_sq').html(parseFloat(mtco2_per_SF *365).toFixed(2));

                    if (data['Generated Waste (lbs per occupant per day)'] == undefined ){
                            $('.mtco2e_occ_main').hide();
                            $('.mtco2e_sq_main').addClass('ml25p');
                    }

                    if ( data['Undiverted Waste (lbs per occupant per day)'] == undefined) {
                            $('.mtco2e_sq_main').hide();
                            $('.mtco2e_occ_main').addClass('ml25p');
                    }

                    if ( data['Generated Waste (lbs per occupant per day)'] == undefined && data['Undiverted Waste (lbs per occupant per day)'] == undefined) {
                            $('#analysis_CC').hide();
                            $('.partition_line_analysis_CC').hide();
                    }
            }
            else{
                    $('#analysis_CC').hide();
                    $('.partition_line_analysis_CC').hide();
            }

            if (data){
                    if (data['Waste Score Uncertainty'] != undefined){
                             if (data['Waste Score Uncertainty'] < 2){
                                    $('#analysis_confidence_value').html('HIGH');
                                    $('#analysis_confidence_value').css('color', '#95BF58');
                                    $('#analysis_confidence_signal').addClass('confidence-rating-high');
                            }
                            else if(data['Waste Score Uncertainty'] < 8){
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

            if (waste_last_month_data){
                    $('.therm_meter_color').addClass('leed-bg-waste');
                            $('#analysis_month_data_value').html(waste_last_month_data);
                            $('.therm_meter_color').show();
                            var data_perc = (parseInt(waste_last_month_data)/12)*100;
                            $('.therm_meter_color').animate({ width: data_perc+'%' }, 2000);
            }

            if (data){
                    if (data['Water Plaque Score with 10% Lower Emissions'] != undefined){
                            $('#analysis_energy_score_dynamic').html(data['Water Plaque Score with 10% Lower Emissions']);
                            var increased_by = parseInt(data['Water Plaque Score with 10% Lower Emissions']) - parseInt(data['Water Plaque Score']);
                            $('#analysis_score_increased_by').html(increased_by);
                    }
                    else{
                            $('#analysis_tool').hide();
                            $('.partition_line_analysis_if').hide();
                            $('#analysis_if_reduce').hide();
                    }
            }
            else{
                    $('#analysis_tool').hide();
                    $('.partition_line_analysis_if').hide();
                    $('#analysis_if_reduce').hide();
            }

            // if(getAnalysisData.last_12_month_score_flag){
            //         getAnalysisData.analysis_last12Month_graph();
            // }
    }).fail(function(data) {
            // if(getAnalysisData.last_12_month_score_flag){
            //         getAnalysisData.analysis_last12Month_graph();
            // }
    });;
});