(function(){
  'use strict';
var app = angular.module('app', ['ui.router']).config( [ '$compileProvider', '$stateProvider', '$urlRouterProvider', function ( $compileProvider, $stateProvider, $urlRouterProvider ) {
    // $compileProvider.debugInfoEnabled( false );
    
    $urlRouterProvider.otherwise( '/home' );
    
    const homeState = {
      name: 'home',
      url: '/home',
      templateUrl: './html/home.html',
      controller: 'homeCtrl'
    };
    
    const adminState = {
      name: 'admin',
      url: '/admin',
      templateUrl: './html/admin.html',
      controller: 'adminCtrl'
    };
    
    
    
    $stateProvider
      .state( homeState )
      .state( adminState );
} ] );

})();