var LEEDOnApp = angular.module('LEEDOnApp', ['ngRoute']);

// configure our routes
LEEDOnApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'apps/components/home/homeView.html',
        controller  : 'homeController'
    })
    .when('/login', {
        templateUrl : 'apps/components/login/loginView.html',
        controller  : 'loginController'
    })
    .when('/dashboard', {
        templateUrl : 'apps/components/dashboard/dashboardView.html',
        controller  : 'dashboardController'
    })
    .otherwise({
        // default page
        redirectTo: '/'
    });
});
