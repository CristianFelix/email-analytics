var nextDate = new Date();
var startDate = (function (s) { var d = new Date(s.getTime()); d.setMonth(d.getMonth() - 1); return d; } (nextDate));

function bindViewEvents() {
    // bind All the event for individual view inside this function    
    $(".widget .wTitle i").unbind("click").click(function (e) {
        $(this).toggleClass("fa-caret-right");
        $(this).closest(".widget").toggleClass("minimize");
        console.log("I am called");
    });
}

$(function () {
    var fromDP = $("#topbar .dropdown .datepicker.from");
    var toDP = $("#topbar .dropdown .datepicker.to");

    $(".datePickerWrap .dp-field").click(function () {
        $(this).closest(".datePickerWrap").addClass("open");
    });

    fromDP.datepicker({
        defaultDate: startDate,
        maxDate: nextDate,
        onSelect: function (selectedDate) {
            toDP.datepicker("option", "minDate", selectedDate);
        }
    });

    toDP.datepicker({
        defaultDate: nextDate,
        minDate: startDate,
        onSelect: function (selectedDate) {
            fromDP.datepicker("option", "maxDate", selectedDate);
        }
    });
    function setDateRange(sDate, nDate) {
        fromDP.datepicker("option", "maxDate", nDate);
        toDP.datepicker("option", "minDate", sDate);

        fromDP.datepicker("setDate", sDate);
        toDP.datepicker("setDate", nDate);

        $(".time-update").click();
    }

    $(".time-update").click(function () {
        var sDate = fromDP.datepicker('getDate'), nDate = toDP.datepicker('getDate');
        angular.element(document.querySelector("[ng-controller='MainCtrl']")).scope().changeDates(sDate, nDate);
        $(this).closest(".datePickerWrap").removeClass("open");
    });

    $(".time-cancel-update").click(function () { $(this).closest(".datePickerWrap").removeClass("open"); });

    $(".time-select .time").click(function () {
        var self = $(this);
        var date = new Date();

        if (self.hasClass("ty")) { // this year 
            setDateRange(new Date(date.getFullYear(), 0, 1), date);
        } else if (self.hasClass("tm")) { // this month                
            setDateRange(new Date(date.getFullYear(), date.getMonth(), 1), date);
        } else if (self.hasClass("tw")) { // this week
            setDateRange(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6), date);
        } else if (self.hasClass("td")) { // this day // today
            setDateRange(date, date);
        } else if (self.hasClass("ly")) { // last year
            setDateRange(new Date(date.getFullYear() - 1, 0, 1), new Date(date.getFullYear(), 0, 0))
        } else if (self.hasClass("lm")) { // last month
            setDateRange(new Date(date.getFullYear(), date.getMonth() - 1, 1), new Date(date.getFullYear(), date.getMonth(), 0))
        } else if (self.hasClass("lw")) { // last week
            setDateRange(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 13), new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
        } else if (self.hasClass("ld")) { // last day // yesterday
            setDateRange(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1), new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
        }
    });
});