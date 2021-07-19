dateFormat = () => {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000); 
    return ISTTime.toString();
  }

var error= function(message,  obj=""){
    timestamp = dateFormat();
    level= "ERROR";
    var message = typeof message === 'object' ? JSON.stringify(message):message;
    message = timestamp + "| Level: "+ level + "|" + message + "|";
    console.log(message, obj);
}
var debug = function(message, obj=""){
    timestamp = dateFormat();
    level= "DEBUG";
    var message = typeof message === 'object' ? JSON.stringify(message):message;
    message = timestamp+ "| Level: "+ level + "|" + message + "|";
    if(process.env.DEBUG) {
        console.log(message, obj);
    }  
}
var warn = function(message="", obj=''){
    timestamp = dateFormat();
    level= "WARN";
    var message = typeof message === 'object' ? JSON.stringify(message):message;
    message = timestamp + "| Level: "+ level + "|" + message + "|";
    console.log(message, obj);
}
var info = function(message = "", obj=''){
    timestamp = dateFormat();
    var level= "INFO";
    var message = typeof message === 'object' ? JSON.stringify(message):message;
    message = timestamp+ "| Level: "+ level + "|" + message + "|";
    console.log(message, obj);
}
var fatal = function(message = "", object=""){
    timestamp = dateFormat();
    level= "FATAL";
    var message = typeof message === 'object' ? JSON.stringify(message):message;
    message = timestamp+ "| Level: "+ level + "|" + message + "|";
    console.log(message, obj);
}


module.exports.info = info;
module.exports.warn = warn;
module.exports.fatal = fatal;
module.exports.debug = debug;
module.exports.error = error;