db.threads.remove({});
db.emails.aggregate([
    { $match: {to: { $ne: false}}},
    { $sort: { date: 1}},
    { $group: { _id: "$threadId", user: {$first: "$user"}, threadStart: {$first: "$date"}, threadEnds: {$last: "$date"}, count: {$sum: 1}, messages: { $push: "$$CURRENT"}}}
]).result.forEach(function(email){
    email.messages.forEach(function(msg){
        if(msg.from.email == msg.user)
            msg.direction = "sent";
        else
            msg.direction = "received";
    });
    
    for(i = 0; i < email.messages.length; i++){
        var msg = email.messages[i];   
        
        
        for(j = i+1; j < email.messages.length; j++){
            var next = email.messages[j];
           
            if(msg.from.email == next.from.email){
                break;
            }
            
            for(k = 0; k < msg.to.length; k++){
                if(next.from.email == msg.to[k].email){
                    if(!msg.to[k].replied)
                    {
                        msg.to[k].replied = next.date;
                        if(!msg.userReplied && msg.to[k].email == msg.user){
                                msg.userReplied = next.date;
                        }
                        if(!msg.themReplied && msg.to[k].email != msg.user){
                                msg.themReplied = next.date;
                        }
                        break;
                    }
                }
            }
        } 
        db.threads.insert(email);
}});

function contains(a, obj) {
        if(!a)
                return false;

    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}