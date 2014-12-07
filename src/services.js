var emailServices = angular.module('emailServices', ['ngResource']);

emailServices.factory('DB', ['$resource',
    function($resource){
        var _db = {};
        
        //TODO - Replace the fake code by the real one
        _db.getGeneralHistogram = function(callBack){
            var Historgram = [];
            
            var endDate = moment();
            var startDate = endDate.clone().subtract(365, 'days');
            var numDays = endDate.diff(startDate, 'days');
            startDate.add(1, 'd');

            for(i=0; i< numDays; i++)
            {
                startDate.add(1, 'd');      
                Historgram.push({Date: startDate.clone().toDate(), Sent: Math.floor((Math.random() * 5) + 1), Received: Math.floor((Math.random() * 20) + 1)});
            }
            if(callBack)
                callBack(Historgram);
        }
        
        //TODO - Change the file by the correct data
        _db.getMainData = function(start, end, callBack){
            if(start.getMonth() > 6)
                var res = $resource('MainData.json');
            else
                var res = $resource('MainData2.json');
            
            res.get({},callBack);
        }
        
        return _db;
  }]);