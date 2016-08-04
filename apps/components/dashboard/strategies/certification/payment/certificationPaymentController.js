LEEDOnApp.controller('certificationPaymentController', function($rootScope, $scope) {
    $('#leed_certification_modal').modal('show');
    $("#leed_certification_modal .modal-content").css("height","920px");
    $("#leed_certification_modal ol.wizard-progress #li-documentation").addClass("active-step");

    $('.pay_mode_certify').click(function() {
        if ($(this).attr("value") == "card") {
            $("#leed_certification_modal .modal-content").css("height","920px");
            $('#check').attr("src", "assets/images/radioEmpty.png");
            $('#card').attr("src", "assets/images/radioFull.png");
            $("#DIeCommFrame_certification_payment").show();
            $(".instruction_section").hide();
            $('#cc').css("font-weight", "Bold");
            $('#chq').css("font-weight", "normal");
            $('.card_type').removeClass("hide");
            $('.bill_details').css("margin-top", "-52px");
        } else if ($(this).attr("value") == "check") {
            $("#leed_certification_modal .modal-content").css("height","1000px");
            $('.card_number').css('cssText', 'border-color: rgba(204,204,204,1)');
            $('.paynow_cvv').css('cssText', 'border-color: rgba(204,204,204,1)');
            $('#check').attr("src", "assets/images/radioFull.png");
            $('#card').attr("src", "assets/images/radioEmpty.png");
            $("#DIeCommFrame_certification_payment").hide();
            $(".instruction_section").show();
            $('#chq').css("font-weight", "Bold");
            $('#cc').css("font-weight", "normal");
            $('.card_type').addClass("hide");
            $('.bill_details').css("margin-top", "25px");
        }
    });
});