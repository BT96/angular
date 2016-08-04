LEEDOnApp.controller('certificationEligibilityController', function($rootScope, $scope) {
    $('#leed_certification_modal').modal('show');
    $("#leed_certification_modal .modal-content").css("height","450px");
    $("#leed_certification_modal ol.wizard-progress #li-eligibility").addClass("active-step");
    $('#leed_certification_modal .modal-header .modal-title').html('Pay for your Certification');
});