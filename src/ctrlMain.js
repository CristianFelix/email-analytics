var EmailApp = angular.module('EmailApp', ['emailServices']);

EmailApp.filter('timeStamp', function () {
    return function (input) {

        return moment.duration(input, 'minutes').humanize();
    };
});

EmailApp.filter('dateSmall', function () {
    return function (input) {
        return new moment(input).format("MMM D, YYYY");
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
                result += item.Name + ", ";
            });
            result = result.substr(0, result.length - 2);
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
            $scope.getFilteredData();
        };
        _histDate.changing = function (start, end) {
            $scope.start = start
            $scope.end = end
            if (!$scope.$$phase) $scope.$apply();
        }
        DB.getGeneralHistogram(_histDate.draw);


        //Remove loading
        document.getElementById('Loading').style.display = "none";
    }

    $scope.getFilteredData = function () {
        DB.getMainData($scope.start, $scope.end, function (data) {
            $scope.Summary = data.Summary;
        });

        setScroolSpy(0);
    }

    $scope.$on("$includeContentLoaded", function () {
        $scope.getFilteredData();
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
              offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
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