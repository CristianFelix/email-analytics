var nextDate = new Date();
var startDate = (function (s) { var d = new Date(s.getTime()); d.setMonth(d.getMonth() - 1); return d; } (nextDate));
$(function () {
    var fromDP = $("#topbar .dropdown .datepicker.from");
    var toDP = $("#topbar .dropdown .datepicker.to");
    $("i").click(function () {
        $(this).toggleClass("fa-caret-right");
    });

    $(".datePickerWrap").click(function () {
        $(this).addClass("open");
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
    }
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