var handler = require("./fileHandler.js");



handler.logReady('./log.txt',function(arr){
    arr.forEach(function(element) {
        handler.checkLevel(element);    
    });
    
    handler.getUserState(function (states) {
        console.log("-----------------running instances-----------------")
        states.forEach(function (element) {
            if(element.state != null){
            console.log(element)
            }
        });
        console.log("-----------------instances ending in error or warning-----------------")
        states.forEach(function (element) {
            if(element.level != "information"){
            console.log(element)
            }
        });
        
    })
})


