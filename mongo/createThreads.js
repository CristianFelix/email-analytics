db.emails.aggregate([
    {$group: {_id: "$threadId", 
        user: { $first: "$user"},
        threadStart: {$first: "$date"},
        threadEnds: {$last: "$date"},
        count: {$sum:1},
        messages:{$push: "$$CURRENT"}
    }},
    {$out: "threads"}
])