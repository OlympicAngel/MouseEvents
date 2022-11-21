const spawn = require('child_process').spawn;
const path = __dirname + '/bin/MiceDetect.exe'; //path to c# executable - created at "C# build" folder (https://github.com/OlympicAngel/MouseEvents/tree/main/C%23%20build)

var child = spawn(path); // opens executable

child.stdout.on('data', HandleBinaryOutput); // transfer all output into stdout handler

// gets and converts all data from executable into json object and then calling events depends on "action" key passed from executable
function HandleBinaryOutput(data) {
    data = data.toString().trim();// normalize output
    data = data.replace(/'/g, '"'); // executable pass json-string with ' instead of "
    let miceData;
    try {
        miceData = JSON.parse(data); //convert string output into json e.g. {action:"move",cords:[0,0]}
    } catch (e) {
        return console.log("error: " + e + "\n" + data); //in case of parse error or tampering with the exe (as it should not ouput anything but json data)
    }


    //handles all events callback
    events.any.forEach((cb) => {
        cb(miceData); // callback trigger 
    })

    //handles specific evetn callback
    const eventCB_arr = events[miceData.action] || [];
    if (!eventCB_arr) // if action is not event ?
        return;
    eventCB_arr.forEach((cb) => {
        cb(miceData); // callback trigger 
    })
}

const events = {
    move: [], //array of functions that should run when "move" triggers
    left_down: [], //array of functions that should run when "left_down" triggers
    left_up: [], //array of functions that should run when "left_up" triggers
    right_down: [], //array of functions that should run when "right_down" triggers
    right_up: [], //array of functions that should run when "right_up" triggers 
    wheel: [], //array of functions that should run when "wheel" triggers
    any: [] //array of functions that should run when-ever one of the above gets events triggered
}

module.exports = {
    /**
     * Register mouse event
 * @param {('move'|'left_down'|'left_up'|'right_down'|'right_up'|'wheel'|'any')} event_name - events of mouse
     * @param {Function} cb function to trigger once events fires
     */
    on(event_name, cb) {

        if (!(cb instanceof Function))
            throw new Error("Undefined callback function! only function accepted..");


        let possibleEvents = Object.keys(events);
        if (possibleEvents.indexOf(event_name) == -1)
            throw new Error("Undefined event passed: '" + event_name + "'.\nPlease provide one of the following events: " + possibleEvents.join(", ") + ".");

        events[event_name].push(cb)
    },

    /**
 * removes mouse event
* @param {('move'|'left_down'|'left_up'|'right_down'|'right_up'|'wheel'|'any')} event_name - events of mouse
 * @param {Function} cb function to trigger once events fires
 */
    remove(event_name, cb) {
        if (!(cb instanceof Function))
            throw new Error("Undefined callback function! only function accepted..");


        let possibleEvents = Object.keys(events);
        if (possibleEvents.indexOf(event_name) == -1)
            throw new Error("Undefined event passed: '" + event_name + "'.\nPlease provide one of the following events: " + possibleEvents.join(", ") + ".");

        let func_index = events[event_name].indexOf(cb);
        if (func_index == -1)
            return new Error("This function is not registered in that event.."); // note it wont throw error but returns an error as this is not fatal.

        events[event_name].splice(func_index, 1);
    }
}
