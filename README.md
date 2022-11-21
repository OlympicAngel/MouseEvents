MouseDetect w/ Node.js
=========

Simple module that adds Global mouse events using C# binary (**Windows only**)
for node.js only - doesnt work for browser..

## Installation

  `npm install @olympicangel/mouse-events`


## Usage
```js
    var MouseEvents = require('@olympicangel/mouse-events');

    MouseEvents.on("move", console.log)
    // will output every mouse movement
    // the output is object: 
    // { action: 'move', cords: [ 960, 528 ] }
```


## Documentation
Not much here really - its straight forward..

### Events:
A list of all events that can be registred(used with "on" function)
- `move` Triggres when mouse moves.
- `wheel` Triggres when scrolling wheel *(not when clicking)*.
- `left_down` Triggres when ***left*** btn press starts.
- `left_up` Triggres when ***left*** btn gets released.
- `right_down` Triggres when ***right*** btn press starts.
- `right_up` Triggres when ***right*** btn gets released.
- `any` Triggres for every event listed above (originaly used for activity detetion or global hook function).

### Functions:
* ```on(event,Function)```  Registers a `function` for `event` - event names taken from [Events](###Events).
* ```remove(event,Function)```  Removes a registred `function` from [Events](###Events) type.


## Why & How
Why windows?
> This module supports only windows as I use windows (sorry tho)..

How does it works?
> The detection is using C# & windows dll hooks - outputing it to node.

Why not other modules?
> There might be other modules that do thats BUT i didnt manges to find any, found only Linux related or old/outdated ones..
