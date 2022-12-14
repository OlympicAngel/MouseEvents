// this simple register every event there is to test if its gets it or not.
// in order to test it there is a need to do this list with your mouse once running:
// - click and release left click - check to see if it gets it.
// - click and release right click - check to see if it gets it.
// ^^ thid should trigger 4 events total: left_down & left_up, right_up & right_down.
// after that move ypu mouse - that shoud trigger a bunch ofmove events.
// for wheel just scoll ypur wheel - doesnt use keyboard pageup/down use actuall mouse - wheel clicks should not trigger events
// and after each test it also should trigger "all" event.

var MouseEvents = require('/mouse-events.js');

    // should triggers for each mouse movement even if its 1 pixel or so..
    MouseEvents.on("move", (e)=>{
        console.log("move event triggred with:")
        cnsole.log(e)
    })

    // should triggers for each mouse scroll, up or down - does not includes whell/scroll click (does not detect that at all)
    MouseEvents.on("wheel", (e)=>{
        console.log("wheel event triggred with:")
        cnsole.log(e)
    })

    // every time a left mouse click goes down - will trigger "left_up" once released
    MouseEvents.on("left_down", (e)=>{
        console.log("left_down event triggred with:")
        cnsole.log(e)
    })

    // every time a left mouse click gets released (after goin down with "left_down" event )
    MouseEvents.on("left_up", (e)=>{
        console.log("left_up event triggred with:")
        cnsole.log(e)
    })

    // every time a right mouse click goes down - will trigger "right_up" once released
    MouseEvents.on("right_down", (e)=>{
        console.log("right_down event triggred with:")
        cnsole.log(e)
    })

    // every time a right mouse click gets released (after goin down with "right_down" event )
    MouseEvents.on("right_up", (e)=>{
        console.log("right_up event triggred with:")
        cnsole.log(e)
    })

    //triggers every single time any of the above events gets fired. this gets fired first and before any of the other events gets called.
    // also can be used as global event as for callback args its has an object with "action" filed wich tells what action triggerd that event,
    // sp its can be checked using if / switch-case insted of registreing several events.
    MouseEvents.on("any", (e)=>{
        console.log("some event triggred with:")
        cnsole.log(e)
    })
