LEEDOnApp.controller('certificationSubmitController', function($rootScope, $scope) {
    $('#leed_certification_modal').modal('show');
    $("#leed_certification_modal .modal-content").css("height","450px");
    $("#leed_certification_modal ol.wizard-progress li").addClass("active-step");
    $("#leed_certification_modal .modal-content").css("height", "450px");
});