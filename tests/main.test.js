/**
 * @jest-environment jsdom
 */

const { setInitialOverlay, setOverlay, 
        coolOverlay, warmOverlay, generateRooms, displayTime } = require('../main');



describe('Applies initial cool and warm overlay backgrounds properly', () => {
  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = '<div class="room"></div>';
    
    // Mock the global rooms array
    global.rooms = [{
      currTemp: 22, // Start with cool temperature (<25)
      image: './assets/living-room.jpg'
    }];
    
    // These are already imported from main.js
    global.coolOverlay = coolOverlay;
    global.warmOverlay = warmOverlay;
  });


  it('applies the initial cool overlay when temperature is below 25', () => {
    const roomElementBefore = document.querySelector('.room');
    
    setInitialOverlay();
    
    // Debug: Check element after calling function
    const roomElementAfter = document.querySelector('.room');
    expect(roomElementAfter.style.backgroundImage).toContain(coolOverlay);
  });



  it('applies the initial warm overlay when temperature is >= 25', () => {
    rooms[0].currTemp = 25;
    setInitialOverlay();
    const bgImage = document.querySelector('.room').style.backgroundImage;
    expect(bgImage).toContain(warmOverlay);

  })

});




describe('Applies subsequent cool and warm overlay backgrounds', () => {
    let roomElement;
  
    beforeEach(() => {
      document.body.innerHTML = '<div class="room"></div>';
      roomElement = document.querySelector('.room');
    });
  

    it('Applies cool overlay when temperature < 25', () => {
      const testRoom = {
        currTemp: 22,
        image: 'cool-room.jpg'
      };
  
      setOverlay(testRoom);
      expect(roomElement.style.backgroundImage).toContain(`${coolOverlay}`);
    });

  
    it('Applies warm overlay when temperature >= 25', () => {
      const testRoom = {
        currTemp: 25,
        image: 'warm-room.jpg'
      };
  
      setOverlay(testRoom);
      expect(roomElement.style.backgroundImage).toContain(`${warmOverlay}`);
    });
  
  });





describe('The generate rooms logic works as expected', () => {
  let roomsControlContainer;
  let mockRooms;


  beforeEach(() => {
    document.body.innerHTML = '<div class="rooms-control"></div>';
    roomsControlContainer = document.querySelector('.rooms-control');

    mockRooms = [
      {
        name: 'Living Room',
        currTemp: 22,
        airConditionerOn: true,
        lastUpdated: new Date() // Example for displayTime
      },
      {
        name: 'Bedroom',
        currTemp: 26,
        airConditionerOn: false,
        lastUpdated: new Date()
      }
    ];
    
    global.rooms = mockRooms;
    global.displayTime = jest.fn().mockReturnValue('<div class="time-display">Mock Time</div>');
  });


  test('Generates the basic HTML structure', () => {
    generateRooms();
    expect(roomsControlContainer.innerHTML).toContain('Turn All ACs On');
  });
  

  test('Correctly renders AC on state', () => {
    generateRooms();
    const html = roomsControlContainer.innerHTML;
    expect(html).toContain('powerOn');
    expect(html).toContain('Living Room - 22°');
    expect(html).toContain('Cooling room to: 22°');
  });


  test('Correctly renders AC off state', () => {
    generateRooms();
    const html = roomsControlContainer.innerHTML;
    expect(html).not.toContain('Bedroom - 26° powerOn');
    expect(html).toContain('style="display: none"');
  });


  test('Calls displayTime for each room', () => {
    generateRooms();
    expect(displayTime).toHaveBeenCalledTimes(mockRooms.length);
  });


});




describe('displayTime', () => {
  let testRoom;

  beforeEach(() => {
    testRoom = {
      startTime: '08:00',
      endTime: '16:00'
    };
  });

  test('Generates the correct HTML structure', () => {
    const result = displayTime(testRoom);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = result;
    
    expect(wrapper.querySelector('.time-display')).not.toBeNull();
    expect(wrapper.querySelectorAll('.time').length).toBe(2);
    expect(wrapper.querySelectorAll('.bar').length).toBe(32);
  });


  it('Displays correct times', () => {
    const result = displayTime(testRoom);
    expect(result).toContain('>08:00<');
    expect(result).toContain('>16:00<');
  });


  it('Handles missing start time', () => {
    const roomWithoutStart = {...testRoom, startTime: undefined};
    const result = displayTime(roomWithoutStart);
    expect(result).toContain('time-display');
    expect(result).not.toContain('>undefined<');
  });



  it('Handles missing end time', () => {
    const roomWithoutEnd = {...testRoom, endTime: undefined};
    const result = displayTime(roomWithoutEnd);
    expect(result).toContain('time-display');
    expect(result).not.toContain('>undefined<');
  });


  it('Handles empty room object', () => {
    const result = displayTime({});
    expect(result).toContain('time-display');
    expect(result).toContain('class="time"');
  });


  test('always generates exactly 32 bars', () => {
    const result = displayTime(testRoom);
    const barCount = (result.match(/class="bar"/g) || []).length;
    expect(barCount).toBe(32);
  });
  
});