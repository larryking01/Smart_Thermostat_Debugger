This document outlines bugs identified in the starter code for the Smart Thermostat App, the methods used to detect them, and how each was resolved.


# Bug 1
File: main.js
Line: 154 & 161
Type: Logical Error

Description: The warm and cold overlays for warm and cool temperatures were swapped
             initially. This caused a warm overlay to be applied on rooms with cool
             temperatures and vice versa.

Method of Identification: Careful inspection of the "rgba" color schemes for the 
                          two overlays.

Solution: Swapping the "warmOverlay" and "coolOverlay" variables to match their 
                   expected colors




# Bug 2
File: main.js
Line: 267
Type: Logical Error

Description: "selectedRoom", inside the "roomSelect" event listener was initially being 
              assigned an object whenever a room was selected from the options. This did
              not allow selected rooms to be displayed when selected because the "setSelectedRoom" function that handled this update was expecting "selectedRoom" to be a string and compare it to the name of the current room.
              However, it was getting an object instead.

Identification: This bug was identified using "console.log" in the browser developer tools

Solution: Using event delegation to retrieve the name of the room and assign the 
          name to selectedRoom instead of the entire object.



# Bug 3
File: main.js
Line: 285 
Type: Logical Error

Description: "room.increaseTemp" was being assigned to the variable increaseRoomTemperature
              and then "increaseRoomTemperature" was called to run the code in "room.increaseTemp". However, the logic in "room.increaseTemp" relied on "this" to
              increase the current room temperature. Assigning it to a variable detaches the
              "increaseTemp" method from the "room" object and "this" loses its context. 
              Subsequently calling "increaseRoomTemperature" will execute "increaseTemp" as
              a standalone function, not as a method of "room". "this" becomes undefined and
              as a result, the temperature is not increased.

Identification: The bug was identified using "console.log" in the browser developer tools.

Solution: Calling the "room.increaseTemp" function directly so as not to lose the context
          of this.



# Bug 4
File: main.js
Line: 314
Type: Logical Error
Description: Same as in # Bug 3 above except with different variable and function names
Identification: Same method as in # Bug 3 above
Solution: Same method as in # Bug 3 above



# Bug 5
File: main.js
Line: 430 
Type: Logical Error

Description: When a room's AC is first turned on or updated there should be reasonable
             feedback to the user. Cooling room to: "setTemperature" should be displayed
             if temperature value is less than 25 and Warming room to: "setTemperature"
             should be displayed if temperature is greater than 25. However, in the logic
             the wrong operator ">" was used instead of "<". As a result the expected feedback message was swapped for warm and cool temperatures.

Identification: Careful inspection of the logic

Solution: Replacing the wrong ">" operator used with the correct "<" operator.




# Bug 6
File: main.js
Line: 374 & 378
Type: Logical error
Description: "errorSpan" element, which displays errors when users enter values out of the
              allowed range displayed the same error messages to users. The error message
              was not tailored for the particular error that occurred.
Identification: Careful inspection of errorSpan text in starter files.
Solution: Modified the error message to be tailored to when cold presets are out of bounds
          or warm presets are out of bounds.


