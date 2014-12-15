angular.module('EmailApp').controller('TimeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$watch(function (scope) { return scope.Time },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.refresh();
            }
        });

    $scope.refresh = function () {
        self.color = d3.scale.category20();
        $scope.Time2 = $scope.Time.map(function(value, i){
            value.color = self.color(i);
            return value;
        });
        drawCharts();
    }

    $scope.toggleGroup =function(t){
        t.domain.show = !t.domain.show;
    }
    $scope.loadContact = function(contact){
        $rootScope.$broadcast('loadContact', contact);
    }
    function drawCharts() {
        $scope.pie1 = $scope.pie1 || new pieChart("#TimeCtrlTablePie1", "You", "You");
        $scope.pie1.draw($scope.Time);
        
        $scope.pie2 = $scope.pie2 || new pieChart("#TimeCtrlTablePie2", "Them", "Contact");
        $scope.pie2.draw($scope.Time);
    }
} ]);