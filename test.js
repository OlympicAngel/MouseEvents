    var MouseEvents = require('/mouse-events.js');

    MouseEvents.on("move", (e)=>{
        console.log("move event triggred with:")
        cnsole.log(e)
    })

    MouseEvents.on("wheel", (e)=>{
        console.log("wheel event triggred with:")
        cnsole.log(e)
    })

    MouseEvents.on("left_down", (e)=>{
        console.log("left_down event triggred with:")
        cnsole.log(e)
    })

    MouseEvents.on("left_up", (e)=>{
        console.log("left_up event triggred with:")
        cnsole.log(e)
    })

    MouseEvents.on("right_down", (e)=>{
        console.log("right_down event triggred with:")
        cnsole.log(e)
    })

    MouseEvents.on("right_up", (e)=>{
        console.log("right_up event triggred with:")
        cnsole.log(e)
    })

    MouseEvents.on("any", (e)=>{
        console.log("some event triggred with:")
        cnsole.log(e)
    })
