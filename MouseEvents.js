const spawn = require('child_process').spawn;
const path = __dirname + '/bin/MiceDetect.exe';

var child = spawn(path);

child.stdout.on('data', HandleBinaryOutput);

function HandleBinaryOutput(data) {
    data = data.toString().trim();// normalize output
    data = data.replace(/'/g, '"');
    let miceData;
    try {
        miceData = JSON.parse(data); //convert string output into json e.g. {action:"move",cords:[0,0]}
    } catch (e) {
        return console.log("error: " + e + "\n" + data);
    }


    //handles all events callback
    events.any.forEach((cb) => {
        cb(miceData);
    })

    //handles specific evetn callback
    const eventCB_arr = events[miceData.action] || [];
    if (!eventCB_arr)
        return;
    eventCB_arr.forEach((cb) => {
        cb(miceData);
    })
}

const events = {
    move: [],
    left_down: [],
    left_up: [],
    right_down: [],
    right_up: [],
    wheel: [],
    any: []
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
            return new Error("This function is not registered in that event..");

        events[event_name].splice(func_index, 1);
    }
}