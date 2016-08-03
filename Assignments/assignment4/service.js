'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .factory('menuFactory', ['$resource', 'baseURL', function($resource,baseURL){

                var menufac = {};
                menufac.getDishes = function(){
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                };
                menufac.getPromotion = function(){
                    return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
                };
                return menufac;
		                   /* menufac.getDish = function (index) {
		                                        return $http.get(baseURL+"dishes/"+index);
		                };*/
                    /*menufac.getPromotion=function(index){
                      return promotions[index];
                    };*/
                     
                    // implement a function named getPromotion
                // that returns a selected promotion.
    
		                
        }])
.factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var corpfac = {};
            corpfac.getLeaders=function(){
               return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
            };
            return corpfac;

           /* corpfac.getLeader=function(index){
              return leadership[index];
            };*/
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
    
    
        }])
.factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var feedfac = {};
              
            feedfac.getFeedback=function(){
               return $resource(baseURL+"feedback/:id",null,  {'update':{method:'PUT' }});
            };
            return feedfac;
           /* corpfac.getLeader=function(index){
              return leadership[index];
            };*/
            
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
    
    
        }])


;