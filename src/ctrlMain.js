var EmailApp = angular.module('EmailApp', ['emailServices']);


EmailApp.filter('timeStamp', function () {
    return function (input) {
        if(input == 0 || input == "i")
            return "-";
        return moment.duration(input, 'minutes').humanize().replace("minutes","min");
    };
});

EmailApp.filter('dateSmall', function () {
    return function (input) {
        return new moment(input).format("MMM D, YYYY");
    };
});

EmailApp.filter('dateString', function () {
    return function (input) {
        return new moment(input).format("YYYY-MM-DD");
    };
});



EmailApp.filter('star', function () {
    return function (input) {
        return (input == true) ? ":" : "";
    };
});

EmailApp.filter('groupContacts', function () {
    return function (input, b) {
        result = "";
        if (input && input.length > 0) {
            input.forEach(function (item) {
                if(item.name.length > 5)
                    result += item.name + ", ";
                else 
                    result += item.email+ ", ";
            });
            result = result.substr(0, result.length - 2);
            result = result.substr(0, 30) + "...";
            result += " (" + b + ")";

        }
        return result;
    };
});

//Main Controller
EmailApp.controller('MainCtrl', ['$scope', 'DB', function ($scope, DB) {
    $scope.init = function () {
        
        
        
        //Get date and draw istogram
        _histDate = new DateHistogram("#mainHistogram");
        _histDate.changed = function (start, end) {
            $scope.start = start;
            $scope.end = end;
            if (!$scope.$$phase) $scope.$apply();
            
            $("#topbar .dropdown .datepicker.from").datepicker("option", "maxDate", end);
            $("#topbar .dropdown .datepicker.to").datepicker("option", "minDate", start);
            $("#topbar .dropdown .datepicker.from").datepicker( "setDate", start );
            $("#topbar .dropdown .datepicker.to").datepicker( "setDate", end );
            
            $scope.StartC = start;
            $scope.EndC = end;
            $scope.getFilteredData();
        };
        _histDate.changing = function (start, end) {
            $scope.start = start
            $scope.end = end
            if (!$scope.$$phase) $scope.$apply();
        }
        DB.getGeneralHistogram(_histDate.draw);

        $scope.changeDates = function (start, end) { // called from datepickers // main.js:48
            if(end > _histDate.data[_histDate.data-1])
                end = _histDate.data[_histDate.data-1];
            if(start < _histDate.data[0])
                start = _histDate.data[0];
            
            $scope.start = start;
            $scope.end = end;
            if (!$scope.$$phase) $scope.$apply();
            _histDate.setDates(start, end);
            $scope.getFilteredData();
            
        }

        //Remove loading
        document.getElementById('Loading').style.display = "none";
    }
    $scope.count = 0;
    $scope.getFilteredData = function () {
        $scope.count++;
        
        document.getElementById('Loading').style.display = "block";
        if($scope.count > 6) 
            document.getElementById('Loading').style.opacity = 0.5;

        DB.getMainData($scope.start, $scope.end, function (data) {
            console.log(data);
            $scope.Summary = data.Summary;
            $scope.Time = data.Time;
            $scope.Frequent = data.Frequent;
            document.getElementById('Loading').style.display = "none";
        });

        setScroolSpy(0);
    }

    $scope.$on("$includeContentLoaded", function (e) {
        $scope.getFilteredData();
        if (e.targetScope.$$nextSibling == null)
            bindViewEvents(); // declared at main.js:4
    })
} ]);


// Spy the scroll to active the menu ------------------------------------
var setScroolSpy = function () {
    var lastId,
            topMenu = $(".menu"),
            topMenuHeight = 121,
            menuItems = topMenu.find("a"),
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });

    menuItems.click(function (e) {
        var href = $(this).attr("href"),
              offsetTop = href === "#" ? 0 : function () {
                  $(href).removeClass("minimize"); return $(href).offset().top - topMenuHeight + 1
              } ();
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 500);
        e.preventDefault();
    });

    $(window).scroll(function () {
        var fromTop = $(this).scrollTop() + topMenuHeight;

        var container = $("#container");
        var height = document.body.clientHeight;
        var scrollHeight = container[0].scrollHeight;
        var st = $(document).scrollTop();
        var bottom = st >= scrollHeight - height - 5;

        var cur = scrollItems.map(function () {
            if (bottom)
                return this;
            if ($(this).offset().top < fromTop)
                return this;

        });

        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "Summary";
        if (lastId !== id) {
            lastId = id;
            menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });
}