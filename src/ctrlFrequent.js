angular.module('EmailApp').controller('FrequentCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$watch(function (scope) { return scope.Frequent },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.refresh();
            }
        });
    
    $scope.MaxR = 1;
    $scope.MaxS = 1;
    $scope.refresh = function () {
        $scope.MaxR = 1;
        $scope.MaxS = 1;
        $scope.Frequent.Received.forEach(function(item){
             if($scope.MaxR < item.count)
                 $scope.MaxR = item.count;
         })
        $scope.Frequent.Sent.forEach(function(item){
             if($scope.MaxS < item.count)
                 $scope.MaxS = item.count;
         })
        drawCharts();
    }
    $scope.getRBar = function(value){
        var maxSize = 80;
        return maxSize * value/$scope.MaxR ;
    }
    
    $scope.getSBar = function(value){
        var maxSize = 80;
        return maxSize * value/$scope.MaxS ;
    }
    $scope.loadContact = function(contact){
        $rootScope.$broadcast('loadContact', contact);
    }
    
    $scope.toggleGroup =function(t){
        t.domain.show = !t.domain.show;
    }

    function drawCharts() {
       
    }
} ]);