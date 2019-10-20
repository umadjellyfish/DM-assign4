

var fs = require('fs');
var arr = new Array();
var userState = new Array();
var corruptLog = new Array();
var instances = new Array();
/*var temp= {
    system_id:id[Math.floor(Math.random()*5)],
    instance_id:instance[Math.floor(Math.random()*5)],
    action_id:action[Math.floor(Math.random()*4)],
    timestamp: date,

}*/



var action_id = ["exit", "login", "logout", "create post", "comment", "upvote", "downvote"];

module.exports = {
    getUserState: function (callback) {
        callback(instances);

    },
    checkLevel: (log) => {
        log = JSON.parse(log)
        if (log.instance_id != null) {
            //console.log(log.instance_id)
            if (instances[""+ log.instance_id] == null) {
                instances["" + log.instance_id] = log;
                //console.log("instance added")
            
            }
            //console.log(instances["" + log.instance_id])
            instances["" + log.instance_id].action_id = log.action_id;
            if (instances["" + log.instance_id].state == null) {
                if (log.action_id == "login") {

                    instances["" + log.instance_id].state = "logged_in";
                    instances["" + log.instance_id].level = "information";
                }
                else {
                    instances["" + log.instance_id].level = "warning";
                    console.log("invalid action log: "+JSON.stringify(log));
                }
            }
            else if (instances["" + log.instance_id].state == "logged_in") {
                if (log.action_id == "create post" || log.action_id == "comment") {
                    instances["" + log.instance_id].level = "information";
                }
                else if (log.action_id == "logout") {
                    instances["" + log.instance_id].level = "information";
                    instances["" + log.instance_id].state = null;
                }
                else if (log.action_id == "upvote") {
                    instances["" + log.instance_id].level = "information";
                    instances["" + log.instance_id].state = "upvoted";
                }
                else {
                    instances["" + log.instance_id].level = "error";
                    console.log("invalid action log: "+JSON.stringify(log));
                }
            }
            else if (instances["" + log.instance_id].state == "upvoted") {
                if (log.action_id == "logout") {
                    instances["" + log.instance_id].level = "information";
                    instances["" + log.instance_id].state = null;
                }
                if (log.action_id != "login") {
                    instances["" + log.instance_id].level = "information";
                }
                else {
                    instances["" + log.instance_id].level = "warning";
                    console.log("invalid action log: "+JSON.stringify(log));
                }
            }
        }
    },
    logReady: function (location,callback) {
        fs.readFile(location, function (err, data) {
            var arr = new Array();
            var userState = new Array();
            var corruptLog = new Array();
            var instances = new Array();
            if (err) {
                throw err;
            }
            arr = data.toString().split("\n");
            arr.forEach(function (e, index) {

                if (e != null && e != "") {
                    e = JSON.parse(e);
                }


            })


            console.log("log size: %s", arr.length)
            console.log("corrupt log files: %s", corruptLog.length)
            console.log("users: %s", userState)
            callback(arr)
        })

    }
};
