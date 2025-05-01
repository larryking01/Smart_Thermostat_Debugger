// Room objects
// bug: room being constant disallows new rooms to be added.
let rooms = [
  {
    name: "Living Room",
    currTemp: 32,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },

    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },

    // bug: adding additional clase to turn all ACs on
    turnAllAirconOn() {
      this.airConditionerOn
        ? ( this.airConditionerOn = true )
        : ( this.airConditionerOn = true )
    }
  },

  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },

    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },

    // bug: adding additional clase to turn all ACs on
    turnAllAirconOn() {
      this.airConditionerOn
        ? ( this.airConditionerOn = true )
        : ( this.airConditionerOn = true )
    }
    
  },


  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },

    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },

    // bug: adding additional clase to turn all ACs on
    turnAllAirconOn() {
      this.airConditionerOn
        ? ( this.airConditionerOn = true )
        : ( this.airConditionerOn = true )
    }
    
  },


  {
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bedroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },

    // bug: adding additional clase to turn all ACs on
    turnAllAirconOn() {
      this.airConditionerOn
        ? ( this.airConditionerOn = true )
        : ( this.airConditionerOn = true )
    }
    
  },

];


// bug 3. linear-gradient values for cool and warm overlays were swapped.
// fixed it by reversing them.
const warmOverlay= `linear-gradient(
    to bottom,
   rgba(236, 96, 98, 0.2),
    rgba(248, 210, 211, 0.13)
  )`;


const coolOverlay = `linear-gradient(
    to bottom,
  rgba(141, 158, 247, 0.2),
  rgba(194, 197, 215, 0.1)
    )`;


const setInitialOverlay = () => {
  document.querySelector(
    ".room"
  ).style.backgroundImage = `url('${rooms[0].image}')`;


  document.querySelector(".room").style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${rooms[0].image}')`;
};


// sets current room image.
const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};


// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;


const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};



const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};



// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

let selectedRoom = rooms[0].name;

// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

setInitialOverlay();

// check current temp at title/top
document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;


// Add new options from rooms array
rooms.forEach((room) => {
  const option = document.createElement("option");
  option.value = room;
  option.textContent = room.name;
  roomSelect.appendChild(option);
});


// Set current temperature to currently selected room
const setSelectedRoom = (selectedRoomParam) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoomParam );
  console.log( "selected room:", room )

  selectedRoom = room.name;
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};




roomSelect.addEventListener("change", function ( event ) {
  // bug 1: selected room was initially returning an object. I had to retrieve
  // the text of actual room using event delegation and correctly pass it to selectedRoom
  // identified with console.log.
  selectedRoom = event.target.options[event.target.selectedIndex].innerText;
  // console.log("selected room:", selectedRoom)

  setSelectedRoom(selectedRoom);

});


// Set preset temperatures
const defaultSettings = document.querySelector(".default-settings");
defaultSettings.addEventListener("click", function (e) {
  console.log( "selected room from default settings = ", selectedRoom )
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  console.log( room )


  // console.log( e.target.id )
  // bug fix: used event delegation to correctly update temperature with
  // warm and cold presets
  if( e.target.id === "cool" ) {
    let updateTemperatureWithColdPreset = room.setCurrTemp.bind( room )
    updateTemperatureWithColdPreset( room.coldPreset )

    currentTemp.textContent = `${room.currTemp}°`;

    // updating temp at header
    document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
    setOverlay( room )

    
    // generate rooms
    // bug 8: current temperature in generate rooms column was not updating when preset was
    // clicked to display because generateRooms was not being called.
    generateRooms()
  }
  else if( e.target.id === "warm" ) {
    let updateTemperatureWithWarmPreset = room.setCurrTemp.bind( room )
    updateTemperatureWithWarmPreset( room.warmPreset )

    // bug 10: current temperature was displaying undefined when warm preset was called
    currentTemp.textContent = `${room.currTemp}°`;

    // updating temp at header
    // bug 9: current temperature at header section was not updating to match displayed 
    // cold preset
    document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
    setOverlay( room )

    // generate rooms
    // bug 8: current temperature in generate rooms column was not updating when preset was
    // clicked to display because generateRooms was not being called.
    generateRooms()

  }
  else {
    //
  }

});


// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  // same error as was the case in reduce temp
  // const increaseRoomTemperature = room.increaseTemp.bind(room);


  if (room.currTemp < 32) {
    room.increaseTemp();
    // console.log(`gggggggggggg`,increaseRoomTemp)
  }

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});




document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  // console.log("room from btn click:", selectedRoom)

  // room.decreaseTemp was being called but it was not binding to the actual
  // room, so 'this' inside decreaseTemp was undefined and calling the 
  // decreaseTemp function did not update the temperature.
  const decreaseRoomTemperature = room.decreaseTemp.bind(room);
  // console.log("decrease room temp:", decreaseRoomTemperature )

  if (room.currTemp > 10) {
    decreaseRoomTemperature();
  }

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});



const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");




const inputsDiv = document.querySelector(".inputs");
// Toggle preset inputs
document.getElementById("newPreset").addEventListener("click", () => {
  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  }
});


// close inputs
document.getElementById("close").addEventListener("click", () => {

  // bug: error span shows previous error message when selected.
  const errorSpan = document.querySelector(".error");
  errorSpan.textContent = ""
  
  inputsDiv.classList.add("hidden");
});



// handle preset input data
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");

  if (coolInput.value && warmInput.value) {
    // Validate the data
    // bug 11. using Math.round to get the correct estimate for the
    // temperature in case a user enters a decimal
    let coolInputValueAsNumber = Math.round( coolInput.value )
    let warmInputValueAsNumber = Math.round( warmInput.value )

    // console.log("cool input value = ", coolInput.value )
    // console.log("warm input value = ", warmInput.value )

    // console.log("cool input value as number= ", coolInputValueAsNumber )
    // console.log("warm input value as number = ", warmInputValueAsNumber )

    
    if( coolInputValueAsNumber < 10 || coolInputValueAsNumber > 25 ) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid cool temperatures (10° - 24°)";
    }
    else if ( warmInputValueAsNumber < 25 || warmInputValueAsNumber > 32 ) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid warm temperatures (25° - 32°)";
    }
    else {
    // Validation passed
    // Set current room's presets
    errorSpan.innerText = ""
    errorSpan.style.display = "none"
    const currRoom = rooms.find((room) => room.name === selectedRoom);

    currRoom.setColdPreset(coolInputValueAsNumber);
    currRoom.setWarmPreset(warmInputValueAsNumber);

    // generateRooms()

    coolInput.value = "";
    warmInput.value = "";

  }

  }
  else {
    errorSpan.style.display = "block";
    errorSpan.innerText = "Enter numeric values for both warm and cold presets";
  }

});




// Rooms Control
// Generate rooms
const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");

  // bug: modifying starter roomHTML code to include button to turn on all ACs
  let roomsHTML = `<button class="turn-all-acs-on" title="Turn all Acs on">Turn All ACs On</button>`;

  rooms.forEach((room) => {
    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch">
              <ion-icon name="power-outline" class="${
                room.airConditionerOn ? "powerOn" : ""
              }"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
          }">${room.currTemp < 25 ? "Cooling room to: " : "Warming room to: "}${  // setting text description to communicate reasonable feedback
      room.currTemp
    }°</span>
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;
};



const displayTime = (room) => {
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `
}

generateRooms();



document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );

    setSelectedRoom(e.target.parentNode.parentNode.id);
    room.toggleAircon();

    // selectedRoom = e.target.parentNode.parentNode.id;

    console.log(`qqqqq`,selectedRoom)
    generateRooms();
  }

  // bug 12: the selected room was not updating accurately in room view and layout.
  // if (e.target.classList.contains("room-name")) {
  //   setSelectedRoom(e.target.parentNode.parentNode.id);
  // }

  // checking if turn all ACs button was clicked then turning on all ACs
  if( e.target.classList.contains("turn-all-acs-on")) {
    // alert("turn all acs on btn clicked")
    rooms.forEach(( room ) => {
      room.turnAllAirconOn()
    })

    generateRooms()


  }




});




// handling the modal 
let openModalBtn = document.querySelector(".open-modal-btn")
let modalDiv = document.getElementById("modal-div")


openModalBtn.addEventListener("click", function () {
  if( modalDiv ) {
    console.log("modal div class list", modalDiv.classList )

    if( modalDiv.classList.contains("hide-modal")) {
      modalDiv.classList.replace("hide-modal", "show-modal")
      modalDiv.innerHTML = `
        <div>
            <div class="add-room-header">
              <h3>Add new room</h3>
              <ion-icon name="close" class="close-modal-btn" size="large" title="Close modal">
              </ion-icon>
            </div>

            <form class="add-room-form">
              <p class="hide-error-info"></p>

              <label for="room name input">Enter room name *</label>
              <input type="text" name="room name input" id="room name input" required class="room-input">

              
              <label for="current temp input">Enter preferred temperature *</label>
              <input type="number" min="10" max="32" step="1" name="current temp input" id="current temp input" required class="room-input">

              
              <label for="warm preset input">Enter warm preset *</label>
              <input type="number" min="25" max="32" step="1" name="warm preset input" id="warm preset input" required class="room-input">

              
              <label for="current temp input">Enter cool preset *</label>
              <input type="number" min="10" max="24" step="1" name="cool preset input" id="cool preset input" required class="room-input">

              <label for="room image">Select room image *</label>
              <input type="file" name="room image" id="room image" class="room-input" required >

              <button type="submit" class="add-room-btn"> Add room </button>
            </form>
        </div>
      `;

      // close the modal dialog
      const closeModalBtn = document.querySelector(".close-modal-btn")
      if( closeModalBtn ) {
        closeModalBtn.addEventListener("click", function () {
            modalDiv.classList.replace("show-modal", "hide-modal")
        })
      }



      // handle submit button
      const addNewRoomBtn = document.querySelector(".add-room-btn") 
      const errorInfo = document.querySelector(".hide-error-info")
      addNewRoomBtn.addEventListener("click", function( e ) {
        e.preventDefault()

        // getting the values of all input elements
        const roomNameInput = document.getElementById("room name input")
        const currentTempInput = document.getElementById("current temp input")
        const warmPresetInput = document.getElementById("warm preset input")
        const coldPresetInput = document.getElementById("cool preset input")
        const roomImage = document.getElementById("room image")
        // const startTimeInput = document.getElementById("start time input")
        // const endTimeInput = document.getElementById("end time input")

        if( roomNameInput.value.trim().length < 1 ) {
          errorInfo.classList.replace("hide-error-info", "show-error-info")
          errorInfo.innerText = "Enter a room name"
        }
        else {
        // adding a room.
        const newRoom = {
          name: roomNameInput.value.trim(),
          currTemp: Math.round( currentTempInput.value ),
          coldPreset: Math.round( coldPresetInput.value ),
          warmPreset: Math.round( warmPresetInput.value ),
          image: "./assets/living-room.jpg",
          airConditionerOn: false,
          startTime: "08:30 AM",
          endTime: "12:00 PM",
      
          setCurrTemp(temp) {
            this.currTemp = temp;
          },
      
          setColdPreset(newCold) {
            this.coldPreset = newCold;
          },
      
          setWarmPreset(newWarm) {
            this.warmPreset = newWarm;
          },
      
          decreaseTemp() {
            this.currTemp--;
          },
      
          increaseTemp() {
            this.currTemp++;
          },
      
          toggleAircon() {
            this.airConditionerOn
              ? (this.airConditionerOn = false)
              : (this.airConditionerOn = true);
          },

          turnAllAirconOn() {
            this.airConditionerOn
              ? ( this.airConditionerOn = true )
              : ( this.airConditionerOn = true )
          }
       }


       console.log("new room = ", newRoom )
       console.log(" room image = ", roomImage.value )

      
       const updatedRooms = [ ...rooms, newRoom ]
       rooms = updatedRooms
       generateRooms()
       // alert("room added")
       modalDiv.classList.replace("show-modal", "hide-modal")
 
       // resetting inputs 

      // updating select to display new room
      roomSelect.innerHTML = ""
      rooms.forEach(( room ) => {
        const option = document.createElement("option")
        option.value = room.name
        option.textContent = room.name
        roomSelect.appendChild( option )
      })




    }


      })

    }
    else {
      // do nothing
    }
  }
  else {
    // do nothing
  }

})

