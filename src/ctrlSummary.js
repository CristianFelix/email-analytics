angular.module('EmailApp').controller('SummaryCtrl', ['$scope',  function ($scope) {
    $scope.$watch(function(scope) { return scope.Summary },
        function(newValue, oldValue) {
            if(newValue != oldValue){
                $scope.refresh();
            }
        });
    
    $scope.refresh = function(){
        drawCharts()
    }
    
    
    
    function drawCharts(){
        $scope.chartM = $scope.chartM || new barChart("#SummaryMonth div", "Day");
        $scope.chartM.xformat = function(d){
            if(d == 0 || d == 14 || d == 7 || d == 21 || d == 30)
                return d+1;
            else
                return "";
        }
        $scope.chartM.draw($scope.Summary.MostActiveMDays);
        
        
        $scope.chartW = $scope.chartW || new barChart("#SummaryWeek div", "Day");
        $scope.chartW.draw($scope.Summary.MostActive);
        
        
        $scope.chartD = $scope.chartD || new barChart("#SummaryDay div","Hour");
        $scope.chartD.xformat = function(d){
            if(d == 0)
                return "12 AM";
            
            if(d == 6)
                return "6 AM";
            
            if(d == 12)
                return "12 PM";
            
            if(d == 18)
                return "6 PM";
            
            else
                return "";
        }
        $scope.chartD.draw($scope.Summary.MostActiveHours);
        
        
    }
}]);