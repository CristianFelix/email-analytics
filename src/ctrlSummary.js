angular.module('EmailApp').controller('SummaryCtrl', ['$scope', function ($scope) {
    $scope.$watch(function (scope) { return scope.Summary },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.refresh();
            }
        });

    $scope.refresh = function () {
        drawCharts();
    }

    function fillMissing(array, field, from, to, values){
        for(i = from; i <= to; i ++)
        {
            var has = false;
            array.forEach(function(item){
                if(values)
                {
                    if(item[field] == values[i]){
                        has = true;
                        return false;
                    }
                }
                else if(item[field] == i)
                {
                    has = true;
                    return false;
                }
            });
            if(!has){
                newelement = {};
                if(values)
                    newelement[field] = values[i];
                else
                    newelement[field] = i;
                newelement.Sent = 0;
                newelement.Received = 0;
                array.push(newelement);
            }
        }
        
        array.sort(function(a,b){
            if(values){
                return values.indexOf(a[field]) - values.indexOf(b[field]);
            }
            else 
                return a[field]-b[field];
        })
    }

    function drawCharts() {
        $scope.chartM = $scope.chartM || new barChart("#SummaryMonth div", "Day");
        $scope.chartM.xformat = function (d) {
            if (d == 0 || d == 14 || d == 7 || d == 21 || d == 30)
                return d + 1;
            else
                return "";
        }
        $scope.chartM.tooltip = function(d){
           return d+1; 
        }
        fillMissing($scope.Summary.MostActiveMDays, "Day", 0,30);      
        $scope.chartM.draw($scope.Summary.MostActiveMDays);


        $scope.chartW = $scope.chartW || new barChart("#SummaryWeek div", "Day");
        $scope.chartW.tooltip = function(d){
           return d; 
        }
        fillMissing($scope.Summary.MostActive, "Day", 0, 6, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        $scope.chartW.draw($scope.Summary.MostActive);


        $scope.chartD = $scope.chartD || new barChart("#SummaryDay div", "Hour");
         $scope.chartD.tooltip = function(d){
            if (d == 0)
                return "12 AM";
            if (d < 12)
                return d + " AM";
            if (d == 12)
                return "12 PM";
             
                return (d-12) + " PM";
             
        }
        $scope.chartD.xformat = function (d) {
            if (d == 0)
                return "12 AM";

            if (d == 6)
                return "6 AM";

            if (d == 12)
                return "12 PM";

            if (d == 18)
                return "6 PM";

            else
                return "";
        }
        fillMissing($scope.Summary.MostActiveHours, "Hour", 0, 23);
        $scope.chartD.draw($scope.Summary.MostActiveHours);


    }
} ]);