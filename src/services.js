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
            
            
            
            //-----------------

                Historgram = [ 
                    {
                        "received" : 22,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 38,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 9,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 33,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 25,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 36,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 44,
                        "sent" : 6,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 47,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 39,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 25,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 64,
                        "sent" : 13,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 71,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 6,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 11,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 43,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 17,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 56,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 9,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 6,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 32,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 37,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 9,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 47,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 12,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 1,
                            "day" : 31
                        }
                    }, 
                    {
                        "received" : 31,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 20,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 47,
                        "sent" : 6,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 26,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 55,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 44,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 38,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 20,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 33,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 8,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 25,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 25,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 46,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 63,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 46,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 2,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 22,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 22,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 33,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 37,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 27,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 24,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 52,
                        "sent" : 12,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 68,
                        "sent" : 8,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 38,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 26,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 37,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 47,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 63,
                        "sent" : 6,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 67,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 34,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 46,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 44,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 65,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 30,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 29,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 3,
                            "day" : 31
                        }
                    }, 
                    {
                        "received" : 52,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 47,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 62,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 58,
                        "sent" : 11,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 20,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 52,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 58,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 31,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 31,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 29,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 28,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 44,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 61,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 29,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 44,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 10,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 6,
                        "date" : {
                            "year" : 2014,
                            "month" : 4,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 27,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 24,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 91,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 56,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 28,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 65,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 55,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 39,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 21,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 59,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 73,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 66,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 78,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 93,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 52,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 77,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 33,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 5,
                            "day" : 31
                        }
                    }, 
                    {
                        "received" : 32,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 62,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 63,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 59,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 68,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 55,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 31,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 82,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 63,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 80,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 62,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 59,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 44,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 31,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 36,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 59,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 83,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 67,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 33,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 6,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 56,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 31,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 29,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 58,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 62,
                        "sent" : 7,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 64,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 65,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 38,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 32,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 68,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 62,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 63,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 72,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 38,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 34,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 81,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 61,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 85,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 39,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 67,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 89,
                        "sent" : 11,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 78,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 7,
                            "day" : 31
                        }
                    }, 
                    {
                        "received" : 58,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 29,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 63,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 58,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 82,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 30,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 66,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 52,
                        "sent" : 19,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 81,
                        "sent" : 9,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 68,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 73,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 25,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 65,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 91,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 100,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 67,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 85,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 65,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 78,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 88,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 83,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 84,
                        "sent" : 6,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 36,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 8,
                            "day" : 31
                        }
                    }, 
                    {
                        "received" : 29,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 55,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 18,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 20,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 52,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 61,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 30,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 18,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 36,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 44,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 36,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 16,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 27,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 46,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 58,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 61,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 26,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 18,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 9,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 56,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 20,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 33,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 40,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 25,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 22,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 5,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 62,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 52,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 59,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 26,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 48,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 37,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 20,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 15,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 55,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 64,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 46,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 10,
                            "day" : 31
                        }
                    }, 
                    {
                        "received" : 28,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 19,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 35,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 50,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 51,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 24,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 20,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 59,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 13
                        }
                    }, 
                    {
                        "received" : 42,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 14
                        }
                    }, 
                    {
                        "received" : 28,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 15
                        }
                    }, 
                    {
                        "received" : 22,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 16
                        }
                    }, 
                    {
                        "received" : 41,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 17
                        }
                    }, 
                    {
                        "received" : 55,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 18
                        }
                    }, 
                    {
                        "received" : 63,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 19
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 20
                        }
                    }, 
                    {
                        "received" : 45,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 21
                        }
                    }, 
                    {
                        "received" : 37,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 22
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 23
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 24
                        }
                    }, 
                    {
                        "received" : 59,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 25
                        }
                    }, 
                    {
                        "received" : 70,
                        "sent" : 4,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 26
                        }
                    }, 
                    {
                        "received" : 53,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 27
                        }
                    }, 
                    {
                        "received" : 60,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 28
                        }
                    }, 
                    {
                        "received" : 39,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 29
                        }
                    }, 
                    {
                        "received" : 39,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 11,
                            "day" : 30
                        }
                    }, 
                    {
                        "received" : 57,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 1
                        }
                    }, 
                    {
                        "received" : 81,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 2
                        }
                    }, 
                    {
                        "received" : 73,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 3
                        }
                    }, 
                    {
                        "received" : 54,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 4
                        }
                    }, 
                    {
                        "received" : 72,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 5
                        }
                    }, 
                    {
                        "received" : 49,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 6
                        }
                    }, 
                    {
                        "received" : 34,
                        "sent" : 3,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 7
                        }
                    }, 
                    {
                        "received" : 67,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 8
                        }
                    }, 
                    {
                        "received" : 72,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 9
                        }
                    }, 
                    {
                        "received" : 84,
                        "sent" : 2,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 10
                        }
                    }, 
                    {
                        "received" : 97,
                        "sent" : 1,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 11
                        }
                    }, 
                    {
                        "received" : 71,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 12
                        }
                    }, 
                    {
                        "received" : 23,
                        "sent" : 0,
                        "date" : {
                            "year" : 2014,
                            "month" : 12,
                            "day" : 13
                        }
                    }
                ];
            
            Historgram = Historgram.map(function(item){
                r = {};
                r.Date = new Date(item.date.year,item.date.month,item.date.day);
                r.Sent = item.sent;
                r.Received = item.received;
                return r;
            });
            
            console.log(Historgram);
            
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