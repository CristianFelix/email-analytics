var emailServices = angular.module('emailServices', ['ngResource']);

emailServices.factory('DB', ['$resource', '$q',
    function($resource, $q){
        var _db = {};
        
        //TODO - Replace the fake code by the real one
        _db.getGeneralHistogram = function(callBack){
            
            
            var res = $resource('http://localhost:5000/api/Histogram'); 
            res.query({},function(Historgram){
                
                Historgram = Historgram.map(function(item){
                    r = {};
                    r.Date = new Date(item.date.year,item.date.month-1,item.date.day);
                    r.Sent = item.sent;
                    r.Received = item.received;
                    return r;
                });
                
                $("#topbar .dropdown .datepicker.from").datepicker( "option", "minDate", Historgram[0].Date );
                $("#topbar .dropdown .datepicker.to").datepicker( "option", "maxDate", Historgram[Historgram.length-1].Date );
                
                if(callBack)
                    callBack(Historgram);
            });
        }
        
        //TODO - Change the file by the correct data
        _db.getMainData = function(start, end, callBack){
            if(start){
                var _start = moment(start).format("YYYY-MM-DD");
                var _end = moment(end).format("YYYY-MM-DD");
                var res = $resource('http://localhost:5000/api/summary?start=' + _start + '&end=' + _end);
                
                
                $q.all([
                    res.get({}, function(data){ console.log("resolved Summary"); return data}).$promise, 
                    _db.getTime(start, end, callBack).$promise,
                    _db.getFrequent(start, end, callBack).$promise
                ])
                .then(function(values) {
                    var result = {};
                    result.Summary = values[0];
                    result.Time = values[1];
                    result.Frequent = values[2];
                    console.log(result);
                    callBack(result);
                });
                
            }
        }
        
        
        
        _db.getContactSummary = function(start, end, contact, callBack){
            var _start = moment(start).format("YYYY-MM-DD");
            var _end = moment(end).format("YYYY-MM-DD");
            var res = $resource('http://localhost:5000/api/summaryContact?contact=' +  contact +'&start=' + _start + '&end=' + _end);
            return res.get({}, callBack);
        }
        
        
        _db.getTime = function(start, end, callBack){
            var _start = moment(start).format("YYYY-MM-DD");
            var _end = moment(end).format("YYYY-MM-DD");
            var res = $resource('http://localhost:5000/api/timeToAnswer?start=' + _start + '&end=' + _end);
            return res.query({}, function(data){ console.log("resolved Time"); return data});
        }
        
        _db.getFrequent = function(start, end, callBack){
            var _start = moment(start).format("YYYY-MM-DD");
            var _end = moment(end).format("YYYY-MM-DD");
            var res = $resource('http://localhost:5000/api/frequentContacts?start=' + _start + '&end=' + _end);
            return res.get({}, function(data){ console.log("resolved Frequent"); return data});
        }
        
        return _db;
  }]);