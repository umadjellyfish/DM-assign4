var handler = require("./fileHandler.js");

handler.logReady('./log2.txt',function(arr){
    arr.forEach(function(element) {
        handler.checkLevel(element);    
    });
    
    handler.getUserState(function (states) {
        console.log("-----------------all instances-----------------")
        states.forEach(function (element) {
            console.log(element)
        });
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