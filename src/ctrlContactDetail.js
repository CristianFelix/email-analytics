angular.module('EmailApp').controller('SummaryContactCtrl', ['$scope', 'DB', function ($scope, DB) {
    $scope.$watchGroup(['StartC', 'StartD'],
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.refresh();
            }
        });
    
    
    $scope.refresh = function () {
        if($scope.email){
            $scope.ContactSummary = undefined;
            DB.getContactSummary($scope.start, $scope.end, $scope.email ,  function (data) {
                $scope.ContactSummary = data;
                
                drawCharts();
               
                var href = "#Contact",
                      offsetTop = href === "#" ? 0 : function () {
                          $(href).removeClass("minimize"); return $(href).offset().top - 121 + 1
                      } ();
                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 500);
            });
        } 
    }
    
    $scope.load = function ()
    { 
        if(!$scope.email){
             alert('Type the email on the box');
        }else {
            $scope.refresh();
        }
    }
    
    $scope.$on('loadContact', function(event, contact) { 
        $scope.email = contact.email; $scope.refresh(); 
        $scope.ContactName = contact.name;
        
         var href = "#Contact",
              offsetTop = href === "#" ? 0 : function () {
                  $(href).removeClass("minimize"); return $(href).offset().top - 121 + 1
              } ();
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 500);
        
    });
    
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
        console.log(array);
    }
    
    function drawCharts() {
        $scope.ContactchartM = $scope.ContactchartM || new barChart("#ContactSummaryMonth div", "Day");
        
        $scope.ContactchartM.xformat = function (d) {
            if (d == 0 || d == 14 || d == 7 || d == 21 || d == 30)
                return d + 1;
            else
                return "";
        }
        $scope.ContactchartM.tooltip = function(d){
           return d+1; 
        }
        fillMissing($scope.ContactSummary.MostActiveMDays, "Day", 0, 30);
        $scope.ContactchartM.draw($scope.ContactSummary.MostActiveMDays);


        $scope.ContactchartW = $scope.ContactchartW || new barChart("#ContactSummaryWeek div", "Day");
        $scope.ContactchartW.tooltip = function(d){
           return d; 
        }
        fillMissing($scope.ContactSummary.MostActive, "Day", 0, 6, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        $scope.ContactchartW.draw($scope.ContactSummary.MostActive);


        $scope.ContactchartD = $scope.ContactchartD || new barChart("#ContactSummaryDay div", "Hour");
         $scope.ContactchartD.tooltip = function(d){
            if (d == 0)
                return "12 AM";
            if (d < 12)
                return d + " AM";
            if (d == 12)
                return "12 PM";
             
                return (d-12) + " PM";
             
        }
        $scope.ContactchartD.xformat = function (d) {
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
        fillMissing($scope.ContactSummary.MostActiveHours, "Hour", 0, 23);
        $scope.ContactchartD.draw($scope.ContactSummary.MostActiveHours);


    }
    
}]);