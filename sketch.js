//import p5 from 'p5';
let currentState; // Will hold a string like: "INTRO", "RED_ROOM", "DINER_1", "FOREST"

let lauraCorruption = 0;
let globalCorruption = 0;
let cursorDoppelganger = { x: 0, y: 0 };

// Loop system variables
let loopCount = 0;
let lauraRemoved = false;

// New variables for lauraForest video visibility and timer
let isLauraVisible = false;
let lauraTimer = 0;
let lauraPlayedOnce = false; // New flag to track if video played once
let whiteScreenActive = false;
let whiteScreenStartTime = 0;
const WHITE_SCREEN_DURATION = 2000; // 2 seconds

let textFill;
let textOutline;
let red;
let curtainRed;
let staticTimer = 0;
const STATIC_DURATION = 1000;
let staticIntensity = 200;
//poem
let showPoem = false;
let poemTimer = 0;
const POEM_DURATION = 5000; // 4 seconds
let stateAfterPoem;
let currentPoemText = "";

let glitchyPoemStartTime = 0; // New variable to track when glitchy poem started
let dialogueStartTime = 0; // New variable to track when dialogue started showing
let desaturation = 0;
const poemForState = {
  "INTRO_TO_RED": "Through the darkness of future past...",
  "DINER1_TO_RED2": "The magician longs to see.",
  "RED2_TO_FOREST": "One chants out between two worlds...",
  "FOREST_TO_FINAL": "Fire walk with me."
};
// SQUARE FRAME DIMENSIONS
let frameSize; // Size of the square content area
let frameX, frameY; // Top-left corner of the square
//guide text  
const guideTexts = {
  INTRO: "YOU'RE ENTERING A ROOM BEYOND LIFE AND DEATH.\n(SOUND ON FOR BEST EXPERIENCE)",
  RED_ROOM_1: "THE ANGELS HAVE GONE AWAY.\nBUT YOU WILL RETURN. DON'T STOP NOW.",
  DINER_1: "THERE'S ALWAYS MUSIC IN THE AIR.\n(FIND THE SILENCE IN-BETWEEN)", // Same as Red Room 1
  RED_ROOM_2: "WHEN YOU SEE ME AGAIN \nIT WON'T BE ME.",
  DINER_2: "(FIND THE SILENCE IN-BETWEEN)", // Same as Red Room 2
  RED_ROOM_3: "WHEN YOU SEE ME AGAIN \nEM EB T'NOW IT.",
  FOREST: "SHE'S WAITING.\nIN THE DARKNESS  WITHIN.",
  FINAL_RED_ROOM: "Nothing left to ask."

};
let currentGuideText = guideTexts.INTRO;
//intro variables
let currentCurtainHeight; // The actual, animating height we draw
let targetCurtainHeight;  // The height we want to eventually reach
let easeSpeed = 0.04;  // How smooth the animation is (0.01 = slow, 0.1 = fast)
let triggerZoneHeight = 50; 
let curtainBuffer;
let curtainY = 0;
let hasRolledUp = false;
let previousMouseY;
let isFullyRolledUp = false;
let showGuide = false;
let fadeAlpha = 255; // Start fully visible
let currentDisplayText = ""; // The text currently shown (for typewriter effect)

let words = []; // Array to store individual words
let wordAlpha = []; // Array to store alpha values for each word
let wordFadeSpeed = 8; // ⭐ CHANGE THIS: How fast words fade in (1-10)
let currentWordIndex = 0; // Which word we're currently fading in
let cursorImg;
let ghostX, ghostY;
// Variables for specific states
let fabric;
let foldOffsets = [];
let shadesOfBrown = [];
let numRects = 15;
let lauraLodge;
let lauraLodge2;
let armchair;
let armchair1;
let floor;
let lamp;
let table;
let lauraDiner;
let texture;
let door;
let coffee;
let jukebox;
let jukeboxWarm;

let floorDiner;
let floorDark;
let tableDark;
let warmTexture;
let coldTexture;
let tableSpill;
let man;
let trees;
let forestTexture;
let lauraForest;
let dancingMan;
let dancingManVideo;
let dinerMood = null;
let stillnessTimer = 0; // For the diner
let frameSizeWidth, frameSizeHeight;
let redRoomStillnessTimer = 0;
let redRoomMovementTimer = 0;
let previousMouseX = 0;
let poemTriggered = false;
let showGlitchyPoem = false;
let fading = false;       // controls whether fade is happening
let fadeA = 0;        // opacity of the black overlay (0 = invisible, 255 = full black)
//red room 2
let hoverTimers = [0, 0]; // Timers for hover on choices
let choiceSelected = false;
let selectedChoiceIndex = -1;
let fadeNextState = "DINER_1";
// Diner variables
let isJukeboxWarm = false;
let jukeboxPlayStartTime = 0;
let tableSpillTriggeredTime = 0;
let isTableSpill = false;
let dinerErasing = false;
let dinerEraseStartTime = 0;
//dialogue
let dialogueActive = false;
let currentDialogue = "";
let dialogueOptions = [];
//let showDialogue = false;
let dialogueCallback;
let dialogueQuestion;
let dialogueChoices;
let question = "Do you feel like you know her?";
let choices = ["> Sometimes.", "> I'm not sure."];
let  question2 = "Is everything what it seems?";
let choices2 = ["> Sometimes.", "> I'm not sure."];
let question3 = "Which world do you belong to?";
let question31 = "Which world do I belong to?";
let choices3 = ["> I'm not sure."];
let choicesNew = [".erus ton m'I <"];
let question4 = "It's been 25 years.\nYou can go now.";
let redRoom3DialogueState = 0; // 0 for original, 1 for new

//other
let pulseAlpha = 0;
let pulseSpeed = 0.05;

//sound
let jukeboxSound;
let noiseSound;
let screamSound;
let redRoomSound;
let redRoomMusic;
let forestSound;
let dinerSound;
let backwardSpeech;
let staticSound;
let redRoomScream;
// New variables for DINER_2 stillness and effects
let diner2StillnessTimer = 0;
let diner2Triggered = false;
let diner2Erasing = false;
let diner2EraseStartTime = 0;
let diner2EraseY = 0;
let cursorRapid = false;
let jukeboxDisappear = false;
let floorToDark = false;
let redTint = false;
let dinerSoundStopped = false; // Flag to track if diner sound has been stopped
let noiseSoundPlayed = false; // Flag to track if noise sound has been played

// Define deltaTime variables
let previousTime = 0;
let deltaTime = 0;
let choiceClickedCount = 0;
// RED_ROOM_3 choice variables
let redRoom3ChoiceVisible = true;
let redRoom3ChoiceHideTime = 0;
const RED_ROOM_3_CHOICE_HIDE_DURATION = 2000; // 2 seconds
let redRoom3ChoiceWasPressed = false; // Track if choice was pressed in previous frame
// Extend drawDiner function to handle DINER_2 stillness and effects
const DINER2_STILLNESS_THRESHOLD = 6000; // 6 seconds
const DINER2_ERASE_DURATION = 5000; // 5 seconds
//forest
let flashlightRadius = 100;
let revealTimer = 0;
let revealThreshold = 120;
let isRevealed = false;
let forestStillnessTimer = 0;
let textShown = false;
// Sound management variables
let forestSoundStarted = false; // Flag to track if forest sound has been started
let backwardSpeechPlayed = false; // Flag to track if backward speech has been played
let userInteracted = false; // Flag to track if user has interacted with the page
let soundStartAttempts = 0; // Track attempts to start sound
let finalRoomTimer = 0; // Timer for final red room sequence
// ============================================
// PRELOAD - Load Assets
// ============================================
function preload() {
font = loadFont('assets/ITC Avant Garde Gothic Demi Condensed.otf');
font2 = loadFont('assets/ITC Avant Garde Gothic Book Condensed.otf');
script = loadFont('assets/NothingYouCouldDo-Regular.ttf');
//img
cursorImg = loadImage('assets/cursor.png');
fabric = loadImage('assets/fabricc.png');
lauraLodge = loadImage('assets/laura 1.png');
lauraLodge2 = loadImage('assets/laura.png');
armchair = loadImage('assets/chair1.png');
armchair1 = loadImage('assets/chair2.png')
lamp = loadImage('assets/lamp.png');
table = loadImage('assets/table4.png');
coffee = loadImage('assets/cff.png');
lauraDiner = loadImage('assets/laura 2.png');
floor = loadImage('assets/floor.png');
jukebox = loadImage('assets/jukebox.png');
jukeboxWarm = loadImage('assets/jukebox warm.png');
floorDiner = loadImage('assets/floor2.png');
texture = loadImage('assets/texture.png');
door = loadImage('assets/door.png');
warmTexture = loadImage('assets/warm.png');
coldTexture = loadImage('assets/coldd.png');
tableSpill = loadImage('assets/table3.png'); 
tableDark = loadImage('assets/tabledark.png');
floorDark = loadImage('assets/floor3.png');
man = loadImage('assets/man.png');
trees = loadImage('assets/foresttt.png');
forestTexture = loadImage('assets/foresttexture.png');

// Load dancing man video
 // Enable looping
//sound
soundFormats('mp3', 'ogg');

jukeboxSound = loadSound('assets/sound/music.mp3');
noiseSound = loadSound('assets/sound/noise.mp3' )
screamSound = loadSound('assets/sound/scream.mp3');
redRoomSound = loadSound('assets/sound/redroom.mp3');
redRoomMusic = loadSound('assets/sound/rrmusic2.mp3');
dinerSound = loadSound('assets/sound/diner.mp3');
forestSound = loadSound('assets/sound/fores.mp3');
backwardSpeech = loadSound('assets/sound/sub.mp3');
staticSound = loadSound('assets/sound/static.mp3');
redRoomScream = loadSound('assets/sound/scream2.mp3');

}
// ============================================
// SETUP - Run once at the start
// ============================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateFrameSize();
  // Create 50 random fold offsets
  for (let i = 0; i < 50; i++) {
    foldOffsets.push(random(TWO_PI));
  }
    currentCurtainHeight = height;
  targetCurtainHeight = height;
  previousMouseY = mouseY;
  previousMouseX = mouseX;
  currentState = "RED_ROOM_1"; // Start with the curtain intro
  previousMouseY = mouseY;
  textFill = '#766d09';
  textOutline = '#5d9d38';
  red = color('#bb3131');
  curtainRed = '#62170fff';
  
  ghostX = mouseX;
  ghostY = mouseY;
if (currentState === "FOREST") {
  noCursor();
  lauraX = frameSizeWidth / 1.5;
  lauraY = frameSizeHeight / 2;
} else {
  
  cursor();
}
  //wood shades
   for (let i = 0; i < numRects; i++) {
    let r = random(63, 65); // Red value
    let g = random(30, 36); // Green value
      let b = random(10, 19); // Blue value
    shadesOfBrown.push(color(r, g, b)); // Store the shade of brown
  }

  isLoaded = true; // Page is fully loaded after setup

  // Initialize video position variables to safe defaults
  lauraX = width / 2;
  lauraY = height / 2;

  // Create video with error handling
  try {
    lauraForest = createVideo(['/assets/laura.webm']);
    lauraForest.hide();
    lauraForest.elt.loop = false; // Disable looping to prevent replay
    isLauraVisible = false;
    lauraTimer = 0;
    lauraForest.pause();
    lauraForest.time(0);

    // Set onended callback for Laura video
    lauraForest.onended(() => {
      // Stop forest sound and start white screen sequence
      forestSound.stop();
      forestSoundStarted = false;
      whiteScreenActive = true;
      whiteScreenStartTime = millis();
      lauraForest.hide();
      isLauraVisible = false;

      // Play scream sound when lauraForest ends
      screamSound.play();
    });

    console.log("lauraForest video loaded successfully");
  } catch (error) {
    console.error("Failed to load lauraForest video:", error);
  }
  dancingManVideo = createVideo(['assets/man.webm']);
dancingManVideo.hide();
dancingManVideo.elt.loop = true;
dancingManVideo.elt.muted = true; // Mute the video for autoplay
dancingManVideo.elt.volume = 0; // Ensure no audio plays
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateFrameSize(); // Recalculate for new window size
  redraw(); // Force redraw to update frame size immediately
}
//square frame function
function calculateFrameSize() {
  let targetAspectRatio = 4 / 3; // Width:Height ratio

  // Calculate frame size to maintain 4:3 aspect ratio
  // Use the smaller dimension as the limiting factor
  let maxFrameHeight = height;
  let maxFrameWidth = width;

  // Calculate what the frame dimensions would be if limited by height
  let heightLimitedWidth = maxFrameHeight * targetAspectRatio;

  // Calculate what the frame dimensions would be if limited by width
  let widthLimitedHeight = maxFrameWidth / targetAspectRatio;

  // Use the limiting factor that fits within the canvas
  if (heightLimitedWidth <= maxFrameWidth) {
    // Height is the limiting factor
    frameSizeHeight = Math.floor(maxFrameHeight);
    frameSizeWidth = Math.floor(heightLimitedWidth);
  } else {
    // Width is the limiting factor
    frameSizeWidth = Math.floor(maxFrameWidth);
    frameSizeHeight = Math.floor(widthLimitedHeight);
  }

  // Center the frame
  frameX = Math.floor((width - frameSizeWidth) / 2);
  frameY = Math.floor((height - frameSizeHeight) / 2);

  // Debug output to check aspect ratio
  let actualRatio = frameSizeWidth / frameSizeHeight;
  console.log(`Frame size: ${frameSizeWidth}x${frameSizeHeight}, Ratio: ${actualRatio.toFixed(3)} (target: ${targetAspectRatio})`);
}

// Alternative: Fixed frame size that maintains 4/3 ratio
function calculateFrameSizeFixed() {
  let targetAspectRatio = 4 / 3; // Width:Height ratio

  // Use a fixed base size (e.g., 600px height equivalent)
  let baseHeight = 600;
  frameSizeHeight = Math.floor(baseHeight);
  frameSizeWidth = Math.floor(baseHeight * targetAspectRatio);

  // Scale to fit canvas while maintaining aspect ratio
  let scaleX = width / frameSizeWidth;
  let scaleY = height / frameSizeHeight;
  let scale = Math.min(scaleX, scaleY); // Fit within canvas

  frameSizeWidth = Math.floor(frameSizeWidth * scale);
  frameSizeHeight = Math.floor(frameSizeHeight * scale);

  // Center on canvas
  frameX = Math.floor((width - frameSizeWidth) / 2);
  frameY = Math.floor((height - frameSizeHeight) / 2);
}

// Alternative: Always use smaller dimension as base
function calculateFrameSizeResponsive() {
  let targetAspectRatio = 4 / 3; // Width:Height ratio

  // Use the smaller canvas dimension as base
  let baseSize = Math.min(width, height);
  frameSizeHeight = Math.floor(baseSize);
  frameSizeWidth = Math.floor(baseSize * targetAspectRatio);

  // If width is limiting factor, recalculate
  if (frameSizeWidth > width) {
    frameSizeWidth = Math.floor(width);
    frameSizeHeight = Math.floor(width / targetAspectRatio);
  }

  // Center on canvas
  frameX = Math.floor((width - frameSizeWidth) / 2);
  frameY = Math.floor((height - frameSizeHeight) / 2);
}

// ============================================
// DRAW - Run over and over again
// ============================================
function draw() {
  // Update deltaTime
  deltaTime = millis() - previousTime;
  previousTime = millis();

  background(0); // Black background for the entire screen

  // Handle white screen effect after Laura video ends
  if (whiteScreenActive) {
    fill(255); // White screen
    noStroke();
    rect(0, 0, width, height);

    // Check if white screen duration has passed
    if (millis() - whiteScreenStartTime >= WHITE_SCREEN_DURATION) {
      // Trigger final poem and transition to FINAL_RED_ROOM
      triggerPoem(poemForState.FOREST_TO_FINAL, "FINAL_RED_ROOM");
      whiteScreenActive = false;
    }
    return; // Don't draw anything else during white screen
  }

     if (showPoem) {
    handlePoemTransition();
    return; // EXIT the draw function early
  }

  // Movement logic for RED_ROOM_1, RED_ROOM_2, and RED_ROOM_3
  if (currentState === "RED_ROOM_1" || currentState === "RED_ROOM_2" || currentState === "RED_ROOM_3") {
    if (mouseX !== previousMouseX || mouseY !== previousMouseY) {
      // Track continuous movement time
      redRoomMovementTimer += deltaTime;
      redRoomStillnessTimer = 0;

    // Show glitchy poem only after 1.5 seconds of continuous movement
    if (redRoomMovementTimer > 2000) {
      showGlitchyPoem = true;
      if (currentState === "RED_ROOM_3" && glitchyPoemStartTime === 0) {
        glitchyPoemStartTime = millis();
      }
    }
  } else {
    redRoomStillnessTimer += deltaTime;

    // Only reset movement timer after 200ms of stillness (allows brief pauses)
    if (redRoomStillnessTimer > 200) {
      redRoomMovementTimer = 0;
    }

    // Show glitchy poem after 6 seconds of stillness in RED_ROOM_3
    if (currentState === "RED_ROOM_3" && redRoomStillnessTimer > 5000 && !showGlitchyPoem) {
      showGlitchyPoem = true;
      glitchyPoemStartTime = millis();
    }

    // Hide glitchy poem after 3 seconds of stillness
  }
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }

  // Final red room timer logic - triggers after 20 seconds
  if (currentState === "FINAL_RED_ROOM") {
    finalRoomTimer += deltaTime;

    // After 5 seconds, show the glitchy poem
    if (finalRoomTimer >= 5000 && !showGlitchyPoem) {
      showGlitchyPoem = true;
      glitchyPoemStartTime = millis();
    }

    // After 20 seconds, trigger fade overlay and loop back to RED_ROOM_1
    if (finalRoomTimer >= 20000 && !fading) {
      loopCount++;
      triggerFade("RED_ROOM_1");
      // Reset timer for next loop
      finalRoomTimer = 0;
    }
  }

  // --- 1. Draw the HELP BUTTON (behind everything) ---
  if (currentState === "INTRO") {
    drawHelpButton();
  }

  // --- 2. Draw the INTRO CURTAIN (full screen) ---
  if (currentState === "INTRO") {
    // Draw curtain folds
    for (let x = 0; x < width; x++) {
      let brightness = map(noise(x * 0.01), 0, 1, -50, 50);
      stroke(180 + brightness, 0, 0);
      line(x, 0, x, currentCurtainHeight);
    }

    // Draw the title if curtain is up
    if (currentCurtainHeight < height / 3) {
      drawTitle("IT IS HAPPENING AGAIN", width/2, height/3, 80, 255);
      drawGlitchTitle("IT IS HAPPENING AGAIN", width/2, height/3, 80);
    }

    // UPDATE INTRO LOGIC
    if (!isFullyRolledUp) {
      if (mouseY < previousMouseY) {
        targetCurtainHeight = 0;
      } else if (mouseY > previousMouseY) {
        targetCurtainHeight = height;
      }
    }
    let dynamicEase = map(currentCurtainHeight, height, 0, 0.07, 0.2); 
    currentCurtainHeight += (targetCurtainHeight - currentCurtainHeight) * dynamicEase;
    previousMouseY = mouseY;
    if (currentCurtainHeight < 2) {
      currentCurtainHeight = 0;
      isFullyRolledUp = true;
    }
  }

  // --- 3. Apply corruption effects to entire screen ---
 

  // --- 4. Draw the "TV FRAME" content for other states ---
 if (currentState === "RED_ROOM_1" || currentState === "DINER_1" || currentState === "FOREST" || currentState === "RED_ROOM_2" || currentState === "DINER_2" || currentState === "RED_ROOM_3" || currentState === "FINAL_RED_ROOM") {
    push();
    translate(frameX, frameY);
    if (currentState === "RED_ROOM_1" || currentState === "RED_ROOM_2" || currentState === "RED_ROOM_3" || currentState === "FINAL_RED_ROOM") {
      drawRedRoom();
      drawRedRoomBackground();
      
    } else if (currentState === "DINER_1" || currentState === "DINER_2") {
      drawDiner();

    } else if (currentState === "FOREST") {
      drawForest();
    }
    pop();
  }
   if (currentState === "FINAL_RED_ROOM") {
    applyCorruptionEffects();
    applyFinalCorruptionEffects();
  }
if (currentState === "RED_ROOM_3" || currentState === "RED_ROOM_2" || currentState === "RED_ROOM_1" || currentState === "DINER_1" || currentState === "DINER_2") {
    applyCorruptionEffects();   
  }

  // --- 4. Draw the "click to descend" TEXT ---
  if (currentState === "INTRO" && currentCurtainHeight < height / 3 && !showGuide) {
    textFont(font);
    noStroke();
    print("click to descend");
    fill(textOutline); // Bright red for testing
    textSize(16); // Increased size for testing
    textAlign(CENTER, CENTER);
    text("click anywhere to begin", width/2, height/2.3);
  }

  // --- 5. Apply CURTAIN GRAIN EFFECT (do this last) ---
  if (currentState === "INTRO") {
    loadPixels();
    for (let y = 0; y < currentCurtainHeight; y++) {
      for (let x = 0; x < width; x++) {
        let idx = 4 * (y * width + x);
        let grain = random(-20, 20);
        pixels[idx]   = constrain(pixels[idx] + grain, 0, 255);
        pixels[idx+1] = constrain(pixels[idx+1] + grain, 0, 255);
        pixels[idx+2] = constrain(pixels[idx+2] + grain, 0, 255);
      }
    }
    updatePixels();
  }

  // --- 6. Draw the UI GUIDE on top of everything ---
  drawUI();
 drawHelpButton();

  // --- 7. Draw the fade overlay if fading ---
  drawFadeOverlay();
// --- 8. Draw the cursor doppelganger ---
    let lag = 0.3; // smaller = follows faster, larger = more lag
  
  ghostX = lerp(ghostX, mouseX, lag);
  ghostY = lerp(ghostY, mouseY, lag);

  // random glitch offset
  let glitchX = random(-5, 5);
  let glitchY = random(-5, 5);
  if (currentState === "RED_ROOM_3" || currentState === "DINER_2") {
      lag = 0.6;
      glitchX = random(40, 50);
      glitchY = random(40, 60);
    }
  if (currentState === "DINER_2" && cursorRapid) {
    let directionX = random(-10, 20);
    let directionY = random(-10, 20);
    let distance = random(1, 10);
    let newX = ghostX + glitchX + directionX * distance;
    let newY = ghostY + glitchY + directionY * distance;
    newX = constrain(newX, 0, width);
    newY = constrain(newY, 0, height);
    image(cursorImg, newX, newY, 18, 18);
  } else if (currentState === "RED_ROOM_2" || currentState === "RED_ROOM_3" || currentState === "DINER_2") {
    image(cursorImg, ghostX + glitchX, ghostY + glitchY, 18, 18);
  } else if (currentState === "FINAL_RED_ROOM") {
    image(cursorImg, random(0, width), random(0, height), 18, 18);
  } 

}
//CUSTOM FUNCTIONS
function drawHelpButton() {
  console.log("drawHelpButton called - currentState:", currentState);
  
  if (currentState !== "FINAL_RED_ROOM" && currentState !== "FOREST") {
    console.log("Drawing button at", width, height);
    let buttonSize = 30; // Make it big and obvious
    let margin = 20;
    let buttonX = width - margin - buttonSize/2;
    let buttonY = margin + buttonSize/2;

    fill(red); // Bright red
    noStroke();
    circle(buttonX, buttonY, buttonSize);
    fill(0); // Yellow text
    textSize(20);
    textAlign(CENTER, CENTER);
    text("?", buttonX, buttonY);
  }
}
//function to draw title 
function drawTitle(txt, x, y, size, brightness) {
textFont(font);
  push(); // Isolate styling
  textSize(size);
  textAlign(CENTER, CENTER);
  fill(textFill); // A Twin Peaks cyan/blue, not white
  text(txt, x, y);
  pop();
}
// Function to draw the glitchy overlay
function drawGlitchTitle(txt, x, y, size) {
textFont(font);
  push();
  textSize(size);
  textAlign(CENTER, CENTER);
  noStroke();

  // Draw the text multiple times with random offsets to create a "RGB shift" glitch
  for (let i = 0; i < 3; i++) {
    // Choose a random offset for each layer
    let offsetX = random(-2, 2);
    let offsetY = random(-2, 2);

    // Draw one layer in red
    fill(255, 0, 0, 150); // Red, semi-transparent
    text(txt, x + offsetX, y + offsetY);

    // Draw one layer in blue
    fill(textOutline); // Blue, semi-transparent
    text(txt, x - offsetX, y - offsetY);
  }

  // Occasionally add a bigger, more dramatic glitch
  if (random() > 0.97) { // Happens ~3% of the time
    fill(255, 50);
    text(txt, x + random(-10, 10), y + random(-10, 10));
  }
  pop();
}
function drawUI() {
 // --- 1. Draw the evolving guide text (ALWAYS visible) ---

  
  // --- 2. Draw the Guide Overlay if showGuide is true ---
  if (showGuide) {
    fill(0, 255);
    noStroke();
    rect(0, 0, width, height);
    
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    textFont(font2);
    text(currentGuideText, width/2, height/3); // Keep the intro text for overlay
    textSize(16);
    text("(click to close)", width/2, height/3 + 80);
  }

  }
// Call this function when you want to transition via a poem line

//poem functions
function drawPoem() {
  // Solid black background
  background(0);
  
  // Draw the current poem text
  //fill(red); // Light blue/purple color
  //textSize(32);
  //textAlign(CENTER, CENTER);
  //textFont(script);
  //text(currentPoemText, width/2, height/3); // Use the variable, not an array
}

function updatePoem() {
  poemTimer += deltaTime;
  if (poemTimer >= POEM_DURATION) {
    // Time's up! Just move to the next state
    showPoem = false;
    changeState(stateAfterPoem);
  }
}

// Modified trigger function - now takes the text too

function handlePoemTransition() {
  // PHASE 1: TV STATIC TRANSITION
  if (staticTimer < STATIC_DURATION) {
    drawTVStatic();
    staticTimer += deltaTime;
    return; // Don't draw poem yet
  }
  
  // PHASE 2: WORD FADE-IN EFFECT
  background(0);
  
  // Split the poem into words if we haven't already
  if (words.length === 0) {
    words = currentPoemText.split(' ');
    wordAlpha = new Array(words.length).fill(0); // Start all words invisible
  }
  
  // Fade in the current word
  if (currentWordIndex < words.length) {
    wordAlpha[currentWordIndex] += wordFadeSpeed;
    if (wordAlpha[currentWordIndex] >= 255) {
      wordAlpha[currentWordIndex] = 255;
      currentWordIndex++; // Move to next word
    }
  }
  
  textFont(script);
  textSize(32);
  textAlign(LEFT, CENTER);
  let startX = width / 2 - 200;
  let startY = height / 3;
  let x = startX;
  let y = startY;
  let lineHeight = 40;
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let wordWidth = textWidth(word + " ");
    if (x + wordWidth > width) {
      x = startX;
      y += lineHeight;
    }
    fill(red.levels[0], red.levels[1], red.levels[2], wordAlpha[i]);
    text(word, x, y);
    x += wordWidth;
  }
  
  // Check if we should move to the next state
  poemTimer += deltaTime;
  if (poemTimer >= POEM_DURATION && currentWordIndex >= words.length) {
    endPoemTransition();
  }
}




function drawTVStatic() {
  // Fill the screen with random black/white noise
  staticSound.play();
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let brightness = random(staticIntensity);
    pixels[i] = brightness;     // R
    pixels[i+1] = brightness;   // G
    pixels[i+2] = brightness;   // B
  }
  updatePixels();
  
  // Optional: Draw a faint version of the old scene underneath
  tint(255, 100); // Semi-transparent
  // [Draw your normal scene here quickly]
  tint(255, 255); // Reset tint
}

// Update the trigger function to reset static timer
function triggerPoem(poemText, nextState) {
 showPoem = true;
  poemTimer = 0;
  staticTimer = 0;
  currentPoemText = poemText;
  stateAfterPoem = nextState;
  // Reset word arrays
  words = [];
  wordAlpha = [];
  currentWordIndex = 0;
}
// Function to handle user interaction for sound autoplay
function handleUserInteraction() {
  if (!userInteracted) {
    userInteracted = true;
    console.log("User interaction detected - sound can now play");

    // Try to start forest sound if we're in forest state and it hasn't started yet
    if (currentState === "FOREST" && !forestSoundStarted && soundStartAttempts < 3) {
      startForestSound();
    }
  }
}



function mousePressed() {
  // Handle user interaction for sound autoplay
  handleUserInteraction();
   userStartAudio();
  redRoomSound.loop();
  redRoomSound.setVolume(0);
  dinerSound.loop();
  dinerSound.setVolume(0);
  redRoomMusic.loop();
  redRoomMusic.setVolume(0);
  forestSound.loop();
  forestSound.setVolume(0);
  redRoomScream.loop();
  redRoomScream.setVolume(0);

  


  // --- Check if the "?" button was clicked ---
  let buttonSize = 30;
  let margin = 20;
  let buttonX = width - margin - buttonSize/2;
  let buttonY = margin + buttonSize/2;

  let d = dist(mouseX, mouseY, buttonX, buttonY);
  if (d < buttonSize/2) {
    showGuide = !showGuide; // Toggle the guide state
    return; // Exit the function early so we don't trigger the "descend" action
  }

  // --- If the guide is open, a click anywhere closes it ---
  if (showGuide) {
    showGuide = false;
    return; // Exit early
  }

  if (currentState === "INTRO" && currentCurtainHeight < height / 3 && !showGuide) {
    // Trigger the FIRST poem line, then go to Red Room
    triggerPoem(poemForState.INTRO_TO_RED, "RED_ROOM_1");
    currentGuideText = guideTexts["RED_ROOM_1"];
  }

  // Handle dialogue choices if in RED_ROOM_1
  if (currentState === "RED_ROOM_1") {
    // Adjust mouseX and mouseY for the translated frame
    let localMouseX = mouseX - frameX;
    let localMouseY = mouseY - frameY;
    // Calculate positions matching drawDialogue()
    textSize(26); // For question
    let questionY = 40;
    let questionHeight = textAscent() + textDescent() + 15;
    textSize(20); // For choices
    for (let i = 0; i < choices.length; i++) {
      let choiceY = questionY + questionHeight + i * (textAscent() + textDescent() + 8);
      if (localMouseX > 0 && localMouseX < frameSizeWidth && localMouseY > choiceY - 20 && localMouseY < choiceY + 20) {
        if (i === 0) dinerMood = "warm";
        else dinerMood = "dark";
        triggerFade();
        return; // Exit after handling choice
      }
    }
  }

  // Handle dialogue choices for RED_ROOM_3 (moved from drawDialogue for better click detection)
  if (currentState === "RED_ROOM_3" && redRoom3ChoiceVisible && dialogueChoices.length > 0) {
    let localMouseX = mouseX - frameX;
    let localMouseY = mouseY - frameY;
    let questionX = 40; // Define questionX
    textSize(26); // For question
    let questionY = 40;
    let questionHeight = textAscent() + textDescent() + 15;
    textSize(20); // For choices
    let choiceY = questionY + questionHeight + 0 * (textAscent() + textDescent() + 8);
    let choiceWidth = textWidth(dialogueChoices[0]);
    let isHovered = (
      localMouseX >= questionX + 10 &&
      localMouseX <= questionX + 10 + choiceWidth &&
      localMouseY >= choiceY &&
      localMouseY <= choiceY + textAscent() + textDescent()
    );

    if (isHovered) {
      choiceClickedCount++;
      redRoom3ChoiceVisible = false;
      redRoom3ChoiceHideTime = millis();
      redRoom3ChoiceWasPressed = true; // Mark as pressed

      // Check if the choice has been clicked 3 times
      if (choiceClickedCount === 3) {
        triggerFade("FOREST");
      }
    }
  }
}

// Add keyPressed function for additional user interaction detection
function keyPressed() {
  handleUserInteraction();
}
function changeState(newState) {
  currentState = newState;
  currentGuideText = guideTexts[newState] || currentGuideText;

  // Handle cursor visibility based on state
  if (newState === "FOREST") {
    noCursor();
  } else {
    cursor();
  }

  // Stop forest sound when leaving forest state
  if (newState !== "FOREST") {
    forestSound.stop();
    forestSoundStarted = false;
  }

  if (newState === "RED_ROOM_2") {
    hoverTimers = [0, 0];
    choiceSelected = false;
    selectedChoiceIndex = -1;
    // Reset movement timer so glitchy poem appears after 3 seconds of movement
    redRoomMovementTimer = 0;
  }

  if (newState === "RED_ROOM_3") {
    // Reset choice click count for RED_ROOM_3
    choiceClickedCount = 0;
    redRoom3ChoiceVisible = true;
    redRoom3ChoiceWasPressed = false;
  }
}

function endPoemTransition() {
showPoem = false;
  // Reset all word effects for next time
  words = [];
  wordAlpha = [];
  currentWordIndex = 0;
  changeState(stateAfterPoem);
  currentGuideText = guideTexts[stateAfterPoem];
}
// Apply corruption effects
function applyCorruptionEffects() {
  // Reset tint & effects each frame
  
  noTint();
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;

  // --- TIER 1: Subtle fading / drift (0–30) ---
  if (globalCorruption > 0) {
    // Slight desaturation / fading tint
    if (random() < globalCorruption / 400) {
      tint(200, 200, 200, 240); // slightly washed out
    }

    // Gentle screen drift
   

  }

  // --- TIER 2: Ghosting / displacement (30–60) ---
  if (globalCorruption > 30) {
    // Occasional ghost duplicate
     // --- Object ghost trails (things refusing to stay still) ---
  if (random() < globalCorruption / 180) {
    push();
    drawingContext.globalAlpha = 0.15;
    image(get(0, 0, width, height), random(-6, 6), random(-6, 6));
    pop();
  }

 
  // --- Faint duplication of screen fragments ---
  if (random() < globalCorruption / 100) {
    let sx = random(width);
    let sy = random(height);
    let sw = random(40, 100);
    let sh = random(40, 100);
    copy(sx, sy, sw, sh, sx + int(random(-10, 10)), sy + int(random(-10, 10)), sw, sh);
  }
  }

  // --- TIER 3: Fragmentation / emptiness (60–100) ---
  if (globalCorruption > 60) {
  // --- Fading memory rectangles (like erasure) ---


  // --- Gentle ghosting of the whole screen (echoes of itself) ---
  if (random() < globalCorruption / 90) {
    push();
    drawingContext.globalAlpha = 0.08; 
    image(get(0, 0, width, height), random(-4, 4), random(-4, 4));
    pop();
  }
  
  }
}
function applyFinalCorruptionEffects() {
    // --- Subtle channel drift (things slipping out of alignment) ---
      if (random() < globalCorruption / 80) {
    noStroke();
    fill(240, 240, 240, 150); 
    rect(random(width), random(height), random(80, 200), random(80, 200));
  }
  if (random() < globalCorruption / 120) {
    let sx = random(width);
    let sy = random(height);
    let sw = random(60, 180);
    let sh = random(60, 180);
    copy(sx, sy, sw, sh, sx + int(random(-6, 6)), sy, sw, sh);
  }

  if (random() < globalCorruption / 400) {
    fill(255, 255, 255, 200);
    rect(0, 0, width, height);
  }
  
}


  
// ============================================
// RED ROOM - STATE FUNCTIONS
// ============================================
function drawRedRoom() {
  // Ensure frame size is calculated consistently every time
  dinerSound.setVolume(0, 2);
forestSound.stop();
noiseSound.stop();
   redRoomSound.setVolume(1, 2);
  calculateFrameSize();

  console.log(`FINAL_RED_ROOM Frame: ${frameSizeWidth}x${frameSizeHeight}`);
  console.log("TV Frame:", frameX, frameY, frameSizeWidth, frameSizeHeight);
  console.log("Curtain area:", frameSizeHeight * 0.66, frameSizeWidth * 0.2);
  console.log("Canvas size:", width, height);
  // Draw within the TV frame (0,0 to frameSize, frameSize)

  // Set state-specific corruption levels BEFORE applying effects
  if(currentState==="RED_ROOM_1"){
    globalCorruption = -1;
  }
  else if(currentState==="RED_ROOM_2"){
    globalCorruption = 10;
  }
  else if(currentState==="RED_ROOM_3"){
    globalCorruption = 60;
  }
  else if(currentState==="FINAL_RED_ROOM"){
    globalCorruption = 10;
  }

  // Apply corruption effects with the correct corruption level
  if (globalCorruption > 30) {
  if (random() < globalCorruption / 500) {
      translate(random(-1, 1), random(-1, 1));
    }
  }
applyCorruptionEffects();
  rect(0, 0, frameSizeWidth, frameSizeHeight);
  // 1. Draw the background (solid red or gradient)


  // 2. Draw the chevron floor (bottom 1/3 of the frame)

  drawChevronFloor();
drawRedCurtains();

drawGlitchyPoemLine();
if(currentState !=="FINAL_RED_ROOM"){
drawChair1();
}

if(currentState==="RED_ROOM_2"){
  drawLaura2();
}
if(currentState !=="FINAL_RED_ROOM"){
drawChair2();
drawLamp();
}
if(currentState==="RED_ROOM_1"){
  // Laura disappears after first loop
  if (!lauraRemoved) {
    drawLaura();
  }

  // Remove Laura after returning from final red room (first loop)
  if (loopCount >= 1) {
    lauraRemoved = true;
  }
}
if(currentState==="RED_ROOM_3"){
  drawMan();
}
if(currentState==="FINAL_RED_ROOM"){
  drawDancingMan();
  redRoomMusic.setVolume(3);
  redRoomScream.setVolume(0.2);
}

// Draw dialogue after 4 seconds after glitchy poem starts
if (showGlitchyPoem && millis() - glitchyPoemStartTime >= 4000) {
  drawDialogue();
}

// Apply final corruption effects


}
/*function drawGlitchyPoemLine() {
  if (!showGlitchyPoem) return;
  let poemLine = "";
  if (currentState === "RED_ROOM_1") {
    poemLine = "THROUGH THE DARKNESS OF FUTURE PAST...";
    dialogueQuestion = question;
    dialogueChoices = choices;
  } else if (currentState === "RED_ROOM_2") {
    poemLine = "THE MAGICIAN LONGS TO SEE.";
    dialogueQuestion = question2;
    dialogueChoices = choices2;
  } else if (currentState === "RED_ROOM_3") {
    poemLine = "ONE CHANTS OUT BETWEEN TWO WORLDS...";
    dialogueQuestion = question3;
    dialogueChoices = choices3;
  } else if (currentState === "FINAL_RED_ROOM") {
    poemLine = "FIRE WALK WITH ME.";
  }
  let words = poemLine.split(" ");
  // ---- Scattered faint echoes ----
  textSize(30);
  for (let i = 0; i < words.length; i++) {
    // Random placement but within a "curtain area"
    let x = frameSizeWidth / 2 + random(-200, 200);
    let y = frameSizeHeight / 3.5 + random(-120, 120);

    // Soft, low-opacity flicker
    let ghostFlicker = map(sin(frameCount * 0.01 + i), -1, 1, 10, 60);
    fill(50, ghostFlicker);
    text(words[i], x, y);
    textFont(font);
  }
}
  */
function drawGlitchyPoemLine() {
  if (!showGlitchyPoem) return;

  let poemLine = "";
  if (currentState === "RED_ROOM_1") {
    poemLine = "THROUGH THE DARKNESS OF FUTURE PAST...";
    dialogueQuestion = question;
    dialogueChoices = choices;
  } else if (currentState === "RED_ROOM_2") {
    poemLine = "THE MAGICIAN LONGS TO SEE.";
    dialogueQuestion = question2;
    dialogueChoices = choices2;
  } else if (currentState === "RED_ROOM_3") {
    poemLine = "ONE CHANTS OUT BETWEEN TWO WORLDS...";
    dialogueQuestion = question3;
    dialogueChoices = choices3;
  } else if (currentState === "FINAL_RED_ROOM") {
    poemLine = "FIRE WALK WITH ME.";
  }

  textFont(font);
  textSize(40);
  textAlign(CENTER, CENTER);

  // Slow flicker using sine wave
  let ghostFlicker = map(sin(frameCount * 0.03), -1, 1, 20, 80);
  // Base faint layer (always there, like a ghostly imprint)
  fill(50, ghostFlicker);
  text(poemLine, frameSizeWidth / 2, frameSizeHeight / 3.5);

  // Occasional red glitch flash (random chance each frame)
  if (random() < 0.05) {
    let alpha = random(100, 150);
    fill(200, 0, 0, alpha);
    text(poemLine, frameSizeWidth / 2, frameSizeHeight / 3.5);
  }
}


// SIMPLIFIED: Draw dialogue
function drawDialogue() {
  push();
  fill(255);
  textFont(font2);

  // Draw question
  textSize(26);
  textAlign(LEFT, TOP);
  let questionX = 40;
  let questionY = 40;
  
  if (currentState === "RED_ROOM_1") {
    text(question, questionX, questionY);
  } else if (currentState === "RED_ROOM_2") {
    text(question2, questionX, questionY);
    dialogueChoices = choices2;
  } else if (currentState === "RED_ROOM_3") {
    // Question and choices are handled in the RED_ROOM_3 specific logic below to avoid overlap
  } else if (currentState === "FINAL_RED_ROOM") {
    text(question4, questionX, questionY);
    dialogueChoices = []; // No choices for final dialogue
  }


  // Measure height of the question text
  let questionHeight = textAscent() + textDescent() + 15;

  // Draw choices under it after 1 second delay
  textSize(20);
  if (millis() - dialogueStartTime >= 1000 && currentState !== "RED_ROOM_3") {
    let localMouseX = mouseX - frameX;
    let localMouseY = mouseY - frameY;
    for (let i = 0; i < dialogueChoices.length; i++) {
      let choiceY = questionY + questionHeight + i * (textAscent() + textDescent() + 8);

      // Check if mouse is hovering over this choice
      let choiceWidth = textWidth(dialogueChoices[i]);
      let isHovered = (
        localMouseX >= questionX + 10 &&
        localMouseX <= questionX + 10 + choiceWidth &&
        localMouseY >= choiceY &&
        localMouseY <= choiceY + textAscent() + textDescent()
      );

      // Change color if hovered
      if (isHovered) {
        fill(0); // Black for hover
      } else {
        fill(255); // White for normal
      }

      // Update hover timers for RED_ROOM_2
      if (currentState === "RED_ROOM_2") {
        if (isHovered) {
          hoverTimers[i] += deltaTime;
        } else {
          hoverTimers[i] = 0;
        }
      }

      text(dialogueChoices[i], questionX + 10, choiceY);
    }

    // Handle choice selection for RED_ROOM_2
    if (currentState === "RED_ROOM_2") {
      for (let j = 0; j < dialogueChoices.length; j++) {
        if (hoverTimers[j] > 5000 && !choiceSelected) {
          choiceSelected = true;
          selectedChoiceIndex = j;
          if (selectedChoiceIndex === 0) dinerMood = "warm";
          else dinerMood = "dark";
          triggerFade("DINER_2");
        }
      }
    }
  }
  // RED_ROOM_3 specific logic
  if (currentState === "RED_ROOM_3") {
    let questionX = 40; // Define questionX for RED_ROOM_3
    // Set dialogue based on state
    if (redRoom3DialogueState === 0) {
      dialogueQuestion = question3;
      dialogueChoices = choices3;
    } else {
      dialogueQuestion = question31;
      dialogueChoices = choicesNew;
    }
    // Draw the question with isolation from corruption effects
    push();
    // Draw a semi-transparent background for the question to make it visible
    
    fill(255); // Ensure full white color
    textFont(font2);
    textSize(26);
    textAlign(LEFT, TOP);
    text(dialogueQuestion, questionX, questionY);
    pop();
    // Draw the single choice if visible
    if (redRoom3ChoiceVisible && dialogueChoices.length > 0) {
      let choiceY = questionY + questionHeight + 0 * (textAscent() + textDescent() + 8);
      let choiceWidth = textWidth(dialogueChoices[0]);

      // Check if mouse is hovering over this choice
      let localMouseX = mouseX - frameX;
      let localMouseY = mouseY - frameY;
      let isHovered = (
        localMouseX >= questionX + 10 &&
        localMouseX <= questionX + 10 + choiceWidth &&
        localMouseY >= choiceY &&
        localMouseY <= choiceY + textAscent() + textDescent()
      );

      // Change color if hovered
      if (isHovered) {
        fill(0); // Black for hover
      } else {
        fill(255); // White for normal
      }

      text(dialogueChoices[0], questionX + 10, choiceY);
    }

    // Simple click detection - hide choice, toggle state, and count clicks
    if (mousePressed && !redRoom3ChoiceWasPressed) {
      let choiceY = questionY + questionHeight + 0 * (textAscent() + textDescent() + 8);
      let choiceWidth = textWidth(dialogueChoices[0]);
      let localMouseX = mouseX - frameX;
      let localMouseY = mouseY - frameY;
      let isHovered = (
        localMouseX >= questionX + 10 &&
        localMouseX <= questionX + 10 + choiceWidth &&
        localMouseY >= choiceY &&
        localMouseY <= choiceY + textAscent() + textDescent()
      );

      if (isHovered) {
        choiceClickedCount++;
        // Toggle dialogue state
        redRoom3DialogueState = 1 - redRoom3DialogueState;
        // Hide the choice temporarily after click
        redRoom3ChoiceVisible = false;
        redRoom3ChoiceHideTime = millis();
        redRoom3ChoiceWasPressed = true; // Mark that we've registered this press

        // Check if the choice has been clicked 3 times
        if (choiceClickedCount === 5) {
          // Transition to the FOREST scene
          triggerFade("FOREST");
        }
      }
    }

    // Show the choice again after hide duration
    if (redRoom3ChoiceHideTime > 0 && millis() - redRoom3ChoiceHideTime > 2000) {
      redRoom3ChoiceVisible = true;
      redRoom3ChoiceWasPressed = false; // Reset the press state when choice becomes visible again
    }
  }

  pop();
}

function drawLaura() {
  let targetWidth = 370;
  let scaleFactor = targetWidth / lauraLodge.width;
  let targetHeight = lauraLodge.height * scaleFactor;
  image(lauraLodge, 600, 150, targetWidth, targetHeight);

}
function drawMan() {
  let targetWidth = 360;
  let scaleFactor = targetWidth / man.width;
  let targetHeight = man.height * scaleFactor;
  if (random(1) < 0.95) {
      let opacity = round(random(0, 1) * 256); // Randomly select 0 or 255
    tint(255, opacity); // Random flicker in opacity
  }
  image(man, 330, 150, targetWidth, targetHeight);

}
function drawLaura2() {
  let targetWidth = 370;
  let scaleFactor = targetWidth / lauraLodge2.width;
  let targetHeight = lauraLodge2.height * scaleFactor;
  let x = 600;
  let y = 150;
      let mouseMoved = (abs(mouseX - pmouseX) > 0 || abs(mouseY - pmouseY) > 0);

    // Set pulse alpha randomly when mouse moves, otherwise faint
    if (mouseMoved) {
      pulseAlpha = random(150, 255);
    } else {
      pulseAlpha = 255;
    }

    // Apply tint for pulsing effect
    tint(255, pulseAlpha);
    
   
  image(lauraLodge2, x, y, targetWidth, targetHeight);
noTint(); // Reset tint 

}
function drawChair1() {
  let targetWidth = 370;
  let scaleFactor = targetWidth / armchair.width;
  let targetHeight = armchair.height * scaleFactor;
  image(armchair, 620, 150, targetWidth, targetHeight);
  
}
function drawChair2() {
  let targetWidth = 370;
  let scaleFactor = targetWidth / armchair1.width;
  let targetHeight = armchair1.height * scaleFactor;
  image(armchair1, 350, 120, targetWidth, targetHeight);
  
}
function drawLamp() {
  let targetWidth = 350;
  let scaleFactor = targetWidth / lamp.width;
  let targetHeight = lamp.height * scaleFactor;
  image(lamp, 150, 90, targetWidth, targetHeight);
  
}
//RED ROOM FU
function drawRedRoomBackground() {
  // Simple red background - replace with your preferred style
  // Dark red
 rect(0, 0, frameSizeWidth, frameSizeHeight);
push();


  // Instead of sliding, apply a subtle time-based distortion
  let offset = sin(millis() / 500) * 3; // very small wobble
  
  image(fabric, offset, 0, frameSizeWidth, frameSizeHeight);

  pop();
   fill(255);
   
}

function drawChevronFloor() {
let imageWidth = frameSizeWidth; // Adjusted width
let imageHeight = frameSizeHeight / 1.5; // Adjusted height
let imageX = 0; // Bottom left corner
let imageY = frameSizeHeight - imageHeight;
image(floor, imageX, imageY, imageWidth, imageHeight);
}
function drawRedCurtains() {
  let curtainHeight = frameSizeHeight / 1.8;

  // Make coordinates relative to frame size
  let curtainIndentX = frameSizeWidth * 0.3; // 30% from left
  let curtainIndentY = frameSizeHeight * 0.7; // 70% down from top

  // Draw base curtain shape
  fill(curtainRed);
  noStroke();
  beginShape();
  vertex(frameSizeWidth, 0);                 // top-right
  vertex(frameSizeWidth, curtainHeight);     // bottom-right
  vertex(420, 400);    // angled inward (was 420, 430)
  vertex(0, curtainHeight + 40);             // bottom-left
  vertex(0, 0);                              // top-left
  endShape(CLOSE);

  // Add vertical folds inside curtain
  drawCurtainFolds(curtainHeight);
}
// Curved folds
function drawCurtainFolds(curtainHeight) {

  // Draw folds
  let bottomLeftX = 0;
  let bottomLeftY = curtainHeight + 10;
  let bottomMidX = 400;
  let bottomMidY = 300;
  let bottomRightX = frameSizeWidth;
  let bottomRightY = curtainHeight;

    let x = 0;
  let foldIndex = 0;
  while (x < frameSizeWidth) {
    let foldWidth = 30;
    let tt, bx, by;

    if (x < 400) {
      tt = map(x, 0, 400, 0, 1);
      bx = lerp(bottomLeftX, bottomMidX, tt);
      by = lerp(bottomLeftY, bottomMidY, tt);
    } else {
      tt = map(x, 400, frameSizeWidth, 0, 1);
      bx = lerp(bottomMidX, bottomRightX, tt);
      by = lerp(bottomMidY, bottomRightY, tt);
    }

    // Each fold has a unique phase offset + time shimmer
    let offset = foldOffsets[foldIndex % foldOffsets.length];
    let shimmer = sin(x * 0.15 + offset + frameCount * 0.1);
    let brightness = map(shimmer, -1, 1, 30, 80);

    stroke(90, 0, 0, brightness);
    if (currentState === "RED_ROOM_1") {
    strokeWeight(random(5, 10));
    } else {
      strokeWeight(random(5, 20));
    }
    noFill();

    let controlX = x + sin(x * 0.2) * 15;
    let controlY = by / 2;
    bezier(x, 0, controlX, controlY, controlX, controlY, bx, by);

    x += foldWidth;
    foldIndex++;
  }

  // (grain can go here later if you want)
}
function triggerFade(nextState = "DINER_1") {
  fading = true;
  fadeA = 0;          // reset each time you start fading
  fadeNextState = nextState;
}
function drawFadeOverlay() {
  if (fading) {
    fadeA += 5; // Increased from 5 to 8 for faster, more visible fade
    if (fadeA >= 255) {
      fadeA = 255;
      fading = false;
      changeState(fadeNextState);
      fadeA = 0; // Reset fade alpha after state change to avoid overlay covering diner
    }
  }

  // Draw black rectangle overlay with current alpha
  if (fadeA > 0) {
    fill(0, fadeA);
    noStroke();
    rect(0, 0, width, height);
  }
}
function drawDiner() {
  applyCorruptionEffects();
  redRoomSound.setVolume(0, 2);
  dinerSound.setVolume(1, 2);

  if (currentState === "DINER_1") {
    if (mouseX !== previousMouseX || mouseY !== previousMouseY) {
      stillnessTimer = 0;
      dinerErasing = false;
      dinerEraseStartTime = 0;
    } else {
      if (isLoaded) stillnessTimer += deltaTime;
      if (stillnessTimer > 6000 && !isJukeboxWarm && isLoaded) {
        isJukeboxWarm = true;
        jukeboxSound.play();
        jukeboxPlayStartTime = millis();
        tableSpillTriggeredTime = millis();
      }
      if (isJukeboxWarm && tableSpillTriggeredTime > 0 && millis() - tableSpillTriggeredTime > 6000 && isLoaded) {
        isTableSpill = true;
      }
    }
    if (showGuide === true) {
      stillnessTimer = 0; // Reset timer if guide is open
    }
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  } else if (currentState === "DINER_2") {
    globalCorruption = 30;
    // DINER_2 stillness timer and effects
    if (mouseX !== previousMouseX || mouseY !== previousMouseY) {
      
      diner2StillnessTimer = 0;
      diner2Triggered = false;
      diner2Erasing = false;
      diner2EraseStartTime = 0;
      cursorRapid = false;
      jukeboxDisappear = false;
      floorToDark = false;
      redTint = false;
    } else {
      if (isLoaded) diner2StillnessTimer += deltaTime;
      if (diner2StillnessTimer > DINER2_STILLNESS_THRESHOLD && !diner2Triggered) {
        diner2Triggered = true;
        diner2EraseStartTime = millis();
        // Trigger cursorRapid immediately
        cursorRapid = true;
        // Play noise sound only once and stop diner sound when noise plays
        if (!noiseSoundPlayed) {
          noiseSound.play();
          noiseSound.loop();
          noiseSoundPlayed = true;
          // Stop diner sound when noise sound plays
          if (!dinerSoundStopped) {
            dinerSound.stop();
            dinerSoundStopped = true;
          }
        }
      }
      // 4 seconds later, trigger other effects
      if (diner2Triggered && millis() - diner2EraseStartTime > 4000) {
        
        redTint = true;
        
        jukeboxDisappear = true;
        floorToDark = true;
      }
      // Delay erasing by 10 seconds after triggering
      if (diner2Triggered && millis() - diner2EraseStartTime > 10000 && !diner2Erasing) {
        diner2Erasing = true;
        diner2EraseStartTime = millis(); // Reset start time for erasing
      }
    }
    if (showGuide === true) {
      diner2StillnessTimer = 0; // Reset timer if guide is open
    }
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }
  drawDinerBackground();
  drawDinerFloor();

  if (dinerMood === "warm") {
    fill(255, 150, 50, 20); // Golden amber
    noStroke();
    rect(0, 0, frameSizeWidth, frameSizeHeight);
    image(warmTexture, 0, 0, frameSizeWidth, frameSizeHeight);
    drawFilmGrain();
    if (currentState === "DINER_2") {
      globalCorruption = 10;
    }
  } else if (dinerMood === "dark") {
    fill(50, 100, 200, 20); // Cool blue overlay
    noStroke();
    rect(0, 0, frameSizeWidth, frameSizeHeight);
    image(coldTexture, 0, 0, frameSizeWidth, frameSizeHeight);
    drawFilmGrain();
  } else {
    fill(50, 100, 200, 20); // Cool blue overlay
    noStroke();
    rect(0, 0, frameSizeWidth, frameSizeHeight);
    image(coldTexture, 0, 0, frameSizeWidth, frameSizeHeight);
    drawFilmGrain();
  }

  if (!jukeboxDisappear) {
    drawJukeBox();
  }
  drawTable();
  drawCoffee();

  // Erasing effect after 10 seconds of jukebox playing for DINER_1
  if (currentState === "DINER_1") {
    if (isJukeboxWarm && jukeboxPlayStartTime > 0 && millis() - jukeboxPlayStartTime > 10000) {
      if (!dinerErasing) {
        dinerErasing = true;
        dinerEraseStartTime = millis();
      }
    }
    if (dinerErasing) {
      let elapsed = millis() - dinerEraseStartTime;
      let progress = min(elapsed / 5000, 1);
      dinerEraseY = frameSizeHeight * (1 - progress);
      fill(0);
      noStroke();
      rect(0, dinerEraseY, frameSizeWidth, frameSizeHeight - dinerEraseY);

      if (progress === 1 && !poemTriggered) {
        poemTriggered = true;
        triggerPoem(poemForState.DINER1_TO_RED2, "RED_ROOM_2");
        // Let the poem system handle the state transition
      }
    }
  }

  // Erasing effect for DINER_2
  if (currentState === "DINER_2" && diner2Erasing) {
    let elapsed = millis() - diner2EraseStartTime;
    let progress = min(elapsed / DINER2_ERASE_DURATION, 1);
    diner2EraseY = frameSizeHeight * (1 - progress);
    fill(0);
    noStroke();
    rect(0, diner2EraseY, frameSizeWidth, frameSizeHeight - diner2EraseY);

    if (progress === 1 && !poemTriggered) {
        poemTriggered = true;
        triggerPoem(poemForState.RED2_TO_FOREST, "RED_ROOM_3");
        // Let the poem system handle the state transition
      }
  }

  // Additional visual effects for DINER_2
 
}
   function drawFilmGrain() {
    noStroke();
    for (let y = 0; y < height; y += 4) {
      fill(0, random(10, 20)); // subtle transparent black
      rect(0, y, width, 2);
    }
  }
function drawDinerBackground() {

  rect(0, 0, frameSizeWidth, frameSizeHeight);

  // Parameters for the wood-like rectangle
   // Number of rectangles
  let rectWidth = frameSizeWidth / numRects; // Width of each rectangle
  let rectHeight = frameSizeHeight; // Height of each rectangle

  // Loop through each rectangle
  for (let i = 0; i < numRects; i++) {
    let rectX = i * rectWidth; // X position of the rectangle
    let rectY = 0; // Y position of the rectangle

    // Draw the rectangle with the generated shade
    fill(shadesOfBrown[i]);
    noStroke();
    rect(rectX, rectY, rectWidth, rectHeight);
  }

  // Draw red tint overlay if active
  if (redTint) {
    fill(random(220, 255), 0, 0); // Semi-transparent red
    rect(0, 0, frameSizeWidth, frameSizeHeight);
  }

 push();


  // Instead of sliding, apply a subtle time-based distortion
  let offset = sin(millis() / 500) * 3; // very small wobble
  tint(255, 127);
  image(texture, offset, 0, frameSizeWidth, frameSizeHeight);

  pop();
}
function drawDinerFloor() {
  let floorImage = floorDiner;
  let imageWidth = frameSizeWidth;
  let imageHeight = frameSizeHeight * 1.2;
  let imageX = 0;
  let imageY = frameSizeHeight - imageHeight;
let targetWidth = 360;
  let scaleFactor = targetWidth / door.width;
  let targetHeight = door.height * scaleFactor;

  let doorX = imageX + (imageWidth - targetWidth) / 2;
  let doorY = imageY + imageHeight - targetHeight - 240;

  if (floorToDark == true) {
    // Draw dark floor overlay
    floorImage = floorDark;
  }
  // Draw the floor
    image(door, doorX, doorY, targetWidth, targetHeight);
  image(floorImage, imageX, imageY, imageWidth, imageHeight);

}
/*function drawDoor() {
    let targetWidth = 300;
  let scaleFactor = targetWidth / door.width;
  let targetHeight = door.height * scaleFactor;
  image(door, frameSizeWidth / 3, 80, targetWidth, targetHeight);
}*/
function drawJukeBox() {
  let targetWidth = 350;
  let scaleFactor = targetWidth / jukebox.width;
  let targetHeight = jukebox.height * scaleFactor;
  let x = 650;
  let y = 100;

  if (isJukeboxWarm) {
    image(jukeboxWarm, x, y, targetWidth, targetHeight);
    
  } else {
    // Check if mouse is moving
    let mouseMoved = (abs(mouseX - pmouseX) > 0 || abs(mouseY - pmouseY) > 0);

    // Set pulse alpha randomly when mouse moves, otherwise faint
    if (mouseMoved) {
      pulseAlpha = random(150, 255);
    } else {
      pulseAlpha = 255;
    }

    // Apply tint for pulsing effect
    tint(255, pulseAlpha);
    image(jukebox, x, y, targetWidth, targetHeight);
    noTint(); // Reset tint
  }
}

function drawTable() {
  let tableImage = table;
  let targetWidth = 480;
  let scaleFactor = targetWidth / table.width;
  let targetHeight = table.height * scaleFactor;
  // Calculate the coordinates for the bottom left of the frame
  let x = 0;
  let y = frameSizeHeight - targetHeight;

  if (isTableSpill) {
    image(tableSpill, x, y, targetWidth, targetHeight);
  } else {
    if (currentState === "DINER_2") {
      tableImage = tableDark;
    }
    image(tableImage, x, y, targetWidth, targetHeight);
  }
}
function drawCoffee() {
 let targetWidth = 480;
  let scaleFactor = targetWidth / coffee.width;
  let targetHeight = coffee.height * scaleFactor;
  // Calculate the coordinates for the bottom left of the frame
  let x = 0;
  let y = frameSizeHeight - targetHeight;
  
  // Save the current transformation state
  push();
  
  // Translate to the center of the image
  translate(x + targetWidth / 2, y + targetHeight / 2);
  
  // Rotate the image by 4 degrees
  rotate(radians(random(3, 4)));
  
  // Draw the image
  image(coffee, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
  
  // Restore the transformation state
  pop();
}
function calculateFlashlightBrightness() {
  let frameMouseX = mouseX - frameX;
  let frameMouseY = mouseY - frameY;
  let distance = dist(frameMouseX, frameMouseY, frameSizeWidth / 2, frameSizeHeight / 2);
  
  // Adjust the distance threshold to control the range of the flashlight's brightness effect
  let distanceThreshold = 300;
  
  // Calculate the brightness based on the distance from the flashlight
  let brightness = 1 - distance / distanceThreshold;
  
  brightness = constrain(brightness, 0, 1);
  
  return brightness;
}
function drawForest() {
  dinerSound.setVolume(0, 2);
  redRoomSound.setVolume(0, 2);

  // Start forest sound only once when entering the forest state
  if (!forestSoundStarted) {
    forestSound.play();
    forestSoundStarted = true;
  }
  forestSound.setVolume(1, 2);

  drawForestBackground();
  drawTrees();
  // Make the whole scene very dark first
  fill(0, 230); // Slightly less dark overlay
  rect(0, 0, frameSizeWidth, frameSizeHeight);

  // Draw a more transparent light circle in front of the flashlight
  noStroke();
  let frameMouseX = mouseX - frameX;
  let frameMouseY = mouseY - frameY;
  let centerX = constrain(frameMouseX, 0, frameSizeWidth);
  let centerY = constrain(frameMouseY, 0, frameSizeHeight);
  fill(255, 255, 100, 10); // Softer yellow light with lower alpha 10
  ellipse(centerX, centerY, flashlightRadius * 2, flashlightRadius * 2);

  drawFlashlight();

  // Debug: Log lauraX, lauraY and lauraForest dimensions
  console.log("lauraX:", lauraX, "lauraY:", lauraY, "lauraForest width:", lauraForest.width, "height:", lauraForest.height);

  let d = dist(centerX, centerY, lauraX, lauraY);
  if (d < 200) { // radius of flashlight overlap
    console.log("Flashlight distance to Laura:", d, "Laura timer:", lauraTimer);
    lauraTimer += deltaTime;
    if (lauraTimer > 1000 && !isLauraVisible) {
      isLauraVisible = true;
      lauraForest.show();
    }
    // Reduced delay from 6000 to 1000 for testing
    if (lauraTimer > 2000 && lauraForest.elt.paused) {
      lauraForest.play();
      lauraPlayedOnce = true; // Mark as played once
    }
  } else {
    lauraTimer = 0;
    // Don't pause or reset the video when flashlight moves away
    // Let it continue playing if it was started
  }

  if (isLauraVisible) {
    drawlauraForest();
  }

  // Timer-based text display - show after 5 seconds in forest
  forestStillnessTimer += deltaTime;
  if (forestStillnessTimer > 7000) {
    if (!backwardSpeechPlayed) {
    backwardSpeech.play();
    backwardSpeechPlayed = true;
    backwardSpeech.setVolume(6);
  }
    push();
    // Draw semi-transparent background for better visibility
    fill(0, 150);
    noStroke();
    rect(0, frameSizeHeight, frameSizeWidth, 300);

    // Draw the text
    fill(255, 255, 255, 255);
    textFont(font2);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Your Laura disappeared.\nIt's just me now.", frameSizeWidth / 2, frameSizeHeight - 200);
    pop();
  }

  drawCustomCursor();
}
function drawForestBackground() {
  // Simple dark background
  /*noStroke();
  fill(0, 255);
  rect(0, 0, frameSizeWidth, frameSizeHeight);*/
  // Add subtle texture overlay

  fill(20);
  rect(0, 0, frameSizeWidth, frameSizeHeight);
}

function drawTrees() {
  let imageWidth = frameSizeWidth; // Adjusted width
let imageHeight = frameSizeHeight; // Adjusted height
let imageX = 0; // Bottom left corner
let imageY = frameSizeHeight - imageHeight;
image(trees, imageX, imageY, imageWidth, imageHeight);
}
function drawFlashlight() {
  let frameMouseX = mouseX - frameX;
  let frameMouseY = mouseY - frameY;
  let centerX = constrain(frameMouseX, 0, frameSizeWidth);
  let centerY = constrain(frameMouseY, 0, frameSizeHeight);
  
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, frameSizeWidth, frameSizeHeight);
  drawingContext.clip();
  
  // Use noise for more organic animation
  let time = frameCount * 0.1;
  let pulse1 = noise(time) * 4 + 2; // -2 to +2
  let pulse2 = noise(time + 10) * 3 - 1.5; // Different rhythm
  let alphaVariation = noise(time + 20) * 0.1 + 0.9; // 0.9 to 1.0
  
  // Layer 1: Wide, subtle glow
  drawingContext.globalAlpha = 0.25 * alphaVariation;
  drawingContext.fillStyle = 'rgba(235, 234, 232, 1)';
  drawingContext.beginPath();
  drawingContext.arc(centerX, centerY, flashlightRadius * 1.1 + pulse1, 0, TWO_PI);
  drawingContext.fill();
  
  // Layer 2: Main light body
  drawingContext.globalAlpha = 0.4 * alphaVariation;
  drawingContext.fillStyle = 'rgb(255, 240, 190)';
  drawingContext.beginPath();
  drawingContext.arc(centerX, centerY, flashlightRadius + pulse2, 0, TWO_PI);
  drawingContext.fill();
  
  // Layer 3: Hot center
  /*drawingContext.globalAlpha = 0.2 * alphaVariation;
  drawingContext.fillStyle = 'rgba(229, 229, 229, 1)';
  drawingContext.beginPath();
  drawingContext.arc(centerX, centerY, flashlightRadius * 0.8, 0, TWO_PI);
  drawingContext.fill();
  
  drawingContext.globalAlpha = 1.0;
  drawingContext.restore();
  */
}
function drawCustomCursor() {
  push();
  translate(mouseX, mouseY);
  pop();
}

function drawlauraForest() {
  // Play backward speech only once when Laura becomes visible
  

  let targetWidth = 370;
  let scaleFactor = targetWidth / lauraForest.width;
  let targetHeight = lauraForest.height * scaleFactor;
  imageMode(CENTER);
  // Draw a semi-transparent rectangle behind the video for debugging

  image(lauraForest, lauraX, lauraY, targetWidth, targetHeight);


  // Debug: Log if video is playing
  if (!lauraForest.elt.paused) {
    console.log("lauraForest video is playing");
  } else {
    console.log("lauraForest video is paused");
  }
}
/*function drawFinal() {
  drawFilmGrain();
  applyCorruptionEffects();
   rect(0, 0, frameSizeWidth, frameSizeHeight);
  if (currentState !== "FINAL_RED_ROOM") {
  globalCorruption = 100;
  }
drawRedRoomBackground();
drawChevronFloor();
drawRedCurtains();

drawDialogue();

}*/
function drawDancingMan() {
  let targetWidth = 320;
  let scaleFactor = targetWidth / dancingManVideo.width;
  let targetHeight = dancingManVideo.height * scaleFactor;

  // Show and play the video if it's not already playing
  if (dancingManVideo.elt.paused) {
    dancingManVideo.show();
    dancingManVideo.play();
  }

  // Draw the video
  image(dancingManVideo, 450, 150, targetWidth, targetHeight);
}
