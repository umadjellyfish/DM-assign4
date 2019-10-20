var fs = require('fs');

//var level = ["Information","Warning","Error"];
var id = [0,1,2,3];
var instance = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
var action = ["login","logout","create post","comment","upvote","downvote"];
/*
level Information, Warning, Error
system System id
instance Instance id
action Action id
timestamp Time of the event
*/
var txt = "";
for (var i = 0; i < 1000; i++) {
    var date = new Date();
    date.setHours(date.getHours()+i);
    var temp= {
      system_id: id[Math.floor(Math.random() * id.length)],
      instance_id: instance[Math.floor(Math.random()*instance.length)],
      action_id: action[Math.floor(Math.random()*action.length)],
      timestamp: date,

  }
  if(i != 999){
  txt += JSON.stringify(temp) + "\n"
  }else{
    txt += JSON.stringify(temp)
  }
}

fs.writeFile("./log.txt", txt, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
