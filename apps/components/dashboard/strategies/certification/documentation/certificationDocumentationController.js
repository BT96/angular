LEEDOnApp.controller('certificationDocumentationController', function($rootScope, $scope) {
    $('#leed_certification_modal').modal('show');
    $("#leed_certification_modal .modal-content").css("height","750px");
    $("#leed_certification_modal ol.wizard-progress li").removeClass("active-step");
    $("#leed_certification_modal ol.wizard-progress #li-eligibility").addClass("active-step");
});