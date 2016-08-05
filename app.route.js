var LEEDOnApp = angular.module('LEEDOnApp', ['ui.router', 'infinite-scroll', 'oc.lazyLoad', 'ngAnimate']);

// configure our routes
LEEDOnApp.config(function($stateProvider, $compileProvider, $urlRouterProvider) {

    //Intercom code starts
    window.Intercom("boot", {
        app_id: "jexwrrdy"
    });
    //Intercom code ends
    
    // $compileProvider.debugInfoEnabled(false);
    $urlRouterProvider.otherwise("/login");
    $urlRouterProvider.when('/dashboard/{leed_id}', ['$state', function ($state) {$state.go('dashboardState.scoreState');}]);
    $urlRouterProvider.when('/dashboard/{leed_id}/data',['$state', function ($state) {$state.go('dashboardState.dataState.inputState');}]);
    $urlRouterProvider.when('/dashboard/{leed_id}/analysis',['$state', function ($state) {$state.go('dashboardState.analysisState.energyAnalysisState');}]);
    $urlRouterProvider.when('/dashboard/{leed_id}/manage',['$state', function ($state) {$state.go('dashboardState.manageState.setupState');}]);

    $stateProvider
    // .state("homeState", {
    //     url: "/home",
    //     templateUrl: "apps/components/home/homeView.html",
    //     controller : "homeController"
    // })
    .state("loginState", {
        url: "/login",
        templateUrl: "apps/components/login/loginView.html",
        controller : "loginController"
    })
    .state("projectState", {
        url: "/project",
        templateUrl: "apps/components/project/projectView.html",
        controller : "projectController"
     })
    .state("dashboardState", {
        url: "/dashboard/{leed_id}",
        templateUrl: "apps/components/dashboard/dashboardView.html",
        controller : "dashboardController"
     })
    .state("dashboardState.scoreState", {
        url: "/score/",
        templateUrl: "apps/components/dashboard/score/scoreView.html",
        controller : "scoreController"
    })
    .state("dashboardState.dataState", {
        url: "/data",
        templateUrl: "apps/components/dashboard/data/dataView.html",
        controller : "dataController"
    })
    .state("dashboardState.dataState.inputState", {
        url: "/input/",
        templateUrl: "apps/components/dashboard/data/input/inputView.html",
        controller : "inputController"
    })
    .state("dashboardState.dataState.surveyState", {
        url: "/survey",
        templateUrl: "apps/components/dashboard/data/survey/surveyView.html",
        controller : "surveyController"
    })
    .state("dashboardState.strategiesState", {
        url: "/strategies",
        templateUrl: "apps/components/dashboard/strategies/strategiesView.html",
        controller : "strategiesController"
    })
    .state("dashboardState.strategiesState.certificationEligibilityrequiredState", {
        url: "/certification-eligibility-required",
        views: {
                'certificationModal@dashboardState': {
                    templateUrl: "apps/components/dashboard/strategies/certification/eligibilityRequired/certificationEligibilityRequired.html",
                    controller: "certificationEligibilityRequiredController"
            }
        }
    })
    .state("dashboardState.strategiesState.certificationEligibilityState", {
        url: "/certification-eligibility",
        views: {
                'certificationModal@dashboardState': {
                    templateUrl: "apps/components/dashboard/strategies/certification/eligibility/certificationEligibility.html",
                    controller: "certificationEligibilityController"
            }
        }
    })
    .state("dashboardState.strategiesState.certificationDocumentationState", {
        url: "/certification-documentation",
        views: {
                'certificationModal@dashboardState': {
                    templateUrl: "apps/components/dashboard/strategies/certification/documentation/certificationDocumentation.html",
                    controller : "certificationDocumentationController"
            }
        }
    })
    .state("dashboardState.strategiesState.certificationPaymentState", {
        url: "/certification-payment",
        views: {
                'certificationModal@dashboardState': {
                    templateUrl: "apps/components/dashboard/strategies/certification/payment/certificationPayment.html",
                    controller : "certificationPaymentController"
            }
        }
    })
    .state("dashboardState.strategiesState.certificationSubmitState", {
        url: "/certification-submit",
        views: {
                'certificationModal@dashboardState': {
                    templateUrl: "apps/components/dashboard/strategies/certification/submit/certificationSubmit.html",
                    controller : "certificationSubmitController"
            }
        }
    })
    .state("dashboardState.analysisState", {
        url: "/analysis",
        templateUrl: "apps/components/dashboard/analysis/analysisView.html",
        controller : "analysisController"
    })
    .state("dashboardState.analysisState.energyAnalysisState", {
        url: "/energy",
        templateUrl: "apps/components/dashboard/analysis/energy/energyView.html",
        controller : "energyAnalysisController"
    })
    .state("dashboardState.analysisState.waterAnalysisState", {
        url: "/water",
        templateUrl: "apps/components/dashboard/analysis/water/waterView.html",
        controller : "waterAnalysisController"
    })
    .state("dashboardState.analysisState.wasteAnalysisState", {
        url: "/waste",
        templateUrl: "apps/components/dashboard/analysis/waste/wasteView.html",
        controller : "wasteAnalysisController"
    })
    .state("dashboardState.analysisState.transportAnalysisState", {
        url: "/transport",
        templateUrl: "apps/components/dashboard/analysis/transport/transportView.html",
        controller : "transportAnalysisController"
    })
    .state("dashboardState.analysisState.humanAnalysisState", {
        url: "/human",
        templateUrl: "apps/components/dashboard/analysis/human/humanView.html",
        controller : "humanAnalysisController"
    })
    .state("dashboardState.manageState", {
        url: "/manage",
        templateUrl: "apps/components/dashboard/manage/manageView.html",
        controller : "manageController"
    })
    .state("dashboardState.manageState.setupState", {
        url: "/setup",
        templateUrl: "apps/components/dashboard/manage/setup/setupView.html",
        controller : "setupController"
    })
    .state("dashboardState.manageState.teamState", {
        url: "/team",
        templateUrl: "apps/components/dashboard/manage/team/teamView.html",
        controller : "teamController"
    })
    .state("dashboardState.manageState.accountState", {
        url: "/account",
        templateUrl: "apps/components/dashboard/manage/account/accountView.html",
        controller : "accountController"
    })
    .state("dashboardState.manageState.certificationState", {
        url: "/certification",
        templateUrl: "apps/components/dashboard/manage/certification/certificationView.html",
        controller : "certificationController"
    })
    .state("dashboardState.manageState.connectedappsState", {
        url: "/connectedapps",
        templateUrl: "apps/components/dashboard/manage/connectedapps/connectedappsView.html",
        controller : "connectedappsController"
    });
});
