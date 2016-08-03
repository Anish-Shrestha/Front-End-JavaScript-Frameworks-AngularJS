'use strict';
angular.module('confusionApp')
.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
     $scope.showMenu = false;
$scope.message = "Loading ...";
             /*           $scope.dishes= {};
                        menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );*/

                menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });  
                $scope.select = function(setTab) {
    $scope.tab = setTab;
    
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };
  
  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };
}])
 .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
             $scope.showDish = false;
             $scope.message = "Loading ...";
             /*$scope.dish = {};
            menuFactory.getDish(parseInt($stateParams.id,10))
                .then(
                    function(response){
                        $scope.dish = response.data;
                        $scope.showDish=true;
                    },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
                );*/
  
             $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
                    }])
    
.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.comment_now = {
                rating:"5",
                comment:"",
                author:"",
                date:new Date().toISOString()
            };
            
            /*$scope.submitComment = function () {
                $scope.comment_now.date = new Date().toISOString();
                //Appending to orginal array object of comments
                $scope.dish.comments.push($scope.comment_now);
                //Step 4: reset your form to pristine
                //Step 5: reset your JavaScript object that holds your comment
                $scope.comment_now = {rating:"5", comment:"", author:"",
                                       date:"" };
                
                $scope.commentForm.$setPristine();
                
            };*/
            $scope.submitComment = function () {
                                $scope.comment_now.date = new Date().toISOString();
                console.log($scope.comment_now);
                                $scope.dish.comments.push($scope.comment_now);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                                $scope.commentForm.$setPristine();
                                $scope.comment_now = {rating:5, comment:"", author:"", date:""};
            }
        }])
.controller('ContactController', ['$scope', function($scope) {
          $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
          var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
          $scope.channels = channels;
          $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
                $scope.sendFeedback = function() {
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                  $scope.invalidChannelSelection = true;
                   console.log('incorrect');
                }
                else {
                    feedbackFactory.getFeedback().save($scope.feedback);
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
}])
.controller('IndexController', ['$scope', 'menuFactory','corporateFactory', function($scope, menuFactory,corporateFactory) {
 // $scope.featuredDish = {};
  $scope.showDish = false;
  $scope.message = "Loading ...";
 /* menuFactory.getDish(0)
  .then(
      function(response){
          $scope.featuredDish = response.data;
          $scope.showDish = true;
      },
      function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
      }
  );*/
                        $scope.message="Loading ...";
                        $scope.featuredDish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.featuredDish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                        $scope.showPromotion=false;
                        $scope.messagePromo="Loading ...";
                        $scope.promotion = menuFactory.getPromotion().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.promotion = response;
                                $scope.showPromotion = true;
                            },
                            function(response) {
                                $scope.messagePromo = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                        $scope.showChef=false;
                        $scope.messageChef="Loading ...";
                        $scope.chefInfo = corporateFactory.getLeaders().get({id:3})
                        .$promise.then(
                            function(response){
                                $scope.chefInfo = response;
                                $scope.showChef = true;
                            },
                            function(response) {
                                $scope.messageChef = "Error: "+response.status + " " + response.statusText;
                            }
                        );

}])
.controller('AboutController', ['$scope','corporateFactory', function($scope,corporateFactory) {

    $scope.showChef=false;
    $scope.messageChef="Loading ...";
    corporateFactory.getLeaders().query(
                function(response) {
                    $scope.chefInfos = response;
                    $scope.showChef = true;
                },
                function(response) {
                    $scope.messageChef = "Error: "+response.status + " " + response.statusText;
                });
}])
 // implement the IndexController and About Controller here


;