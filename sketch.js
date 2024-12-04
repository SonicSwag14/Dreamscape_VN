let gameState = "center"; // Tracks the current state of the game
let message = "You find yourself in a strange place... Not quite reality, and not quite fiction... In front of you, you see four paths: one leading to a lush forest (L), one to a frozen wasteland (R), one to a dark cave (C), and one to a towering mountain (M).";
let hasMemoryFragment = false; // Tracks if the player has the memory fragment
let gameEnded = false; // Tracks if the game has ended (win or lose)
let inventory = []; // Array to hold the player's inventory
let img;
let pickupSound; // Variable to hold the sound

function preload() {
  img = loadImage('assets/dreamscape.jpg');
  pickupSound = loadSound('assets/pickup.mp3'); // Load the sound file
}

function setup() {
  createCanvas(800, 500);
  img = loadImage('assets/dreamscape.jpg');
  
  textSize(20);
  textWrap(WORD);
}

function draw() {
  image(img, 0, 0);
  
  // Display the message and inventory to the player
  fill("white");
  textAlign(CENTER);
  text(message, 50, 400/2, 650);
  
  // Display the inventory
  textAlign(LEFT);
  text("Inventory: " + inventory.join(", "), 10, height - 30);
  
  // Handle game states
  if (gameState === "center") {
    message =
      "You find yourself in a strange place... Not quite reality, and not quite fiction... In front of you, you see four paths: one leading to a lush forest (L), one to a frozen wasteland (R), one to a dark cave (C), and one to a towering mountain (M).";
  } else if (gameState === "Forest") {
    if (!hasMemoryFragment) {
      message =
        "You see a faintly glowing object in the distance...  \nGo Right (R) to return to the crossroads. (F) to pick up the fragment";
    } else {
      message = "When you approach it, it glows and hovers towards you... You feel like you recall a bit more than you started... Go Right (R) to return to the center.";
    }
  } else if (gameState === "Wasteland") {
    if (hasMemoryFragment) {
      message =
        "You see a shadow in the distance, it's imposing presence frightens you... But with the memories you aquired, you can face it without fear... So, you approach the shadow, and it glances at you. It is your reflection... You approach it and it combines with you... You wake up from the dream, now understanding why you fell asleep. You face your past, and move forward. THE END";
      gameEnded = true; // Game ends with a victory
    } else {
      message =
        "You see a shadow in the distance, it's imposing presence frightens you... 'You are not ready...' but you do not heed its words... The shadows surround you... You are lost to time...";
      gameEnded = true; // Game ends with a loss
    }
  } else if (gameState === "Cave") {
    if (!inventory.includes("Cave Gem")) {
      message = "You endter the mysterious cave. You find a shimmering gem glowing against the dark walls... Pick it up (G) or go back (R).";
    } else {
      message = "You admire the gem in your inventory. Go back (R).";
    }
  } else if (gameState === "Mountain") {
    message = "The mountain looms high and you think it would be impossible to scale... but, at your feet you find a magical flower as a souveneir of your decision to come here. Pick it up (F) or go back (R).";
  }
  
  // If the game has ended, wait for space to restart
  if (gameEnded) {
    message += "\nPress Space to restart.";
  }
}

// Detect key presses for L, R, C, M, and Space
function keyPressed() {
  if (gameEnded && key === " ") {
    restartGame(); // Restart the game if it's over and the player presses Space
  } else if (!gameEnded) {
    // Move between rooms based on current gameState
    if (gameState === "center") {
      if (key === "L" || key === "l") {
        gameState = "Forest"; // Go left to find the fragment
      } else if (key === "R" || key === "r") {
        gameState = "Wasteland"; // Go right to face your shadow
      } else if (key === "C" || key === "c") {
        gameState = "Cave"; // Go to the cave
      } else if (key === "M" || key === "m") {
        gameState = "Mountain"; // Go to the mountain
      }
    } else if (gameState === "Forest") {
      if (key === "R" || key === "r") {
        gameState = "center"; // Return to the center from the Forest
      } else if (key === "F" || key === "f") {
        hasMemoryFragment = true; // Player picks up the fragment
        inventory.push("Memory Fragment"); // Add to inventory
        pickupSound.play(); // Play the pickup sound
      }
    } else if (gameState === "Wasteland") {
      if (key === "L" || key === "l") {
        gameState = "center"; // Return to the center from the Wasteland
      }
    } else if (gameState === "Cave") {
      if (key === "G" || key === "g") {
        inventory.push("Cave Gem"); // Add gem to inventory
        pickupSound.play(); // Play the pickup sound
        gameState = "center"; // Return to the center
      } else if (key === "R" || key === "r") {
        gameState = "center"; // Go back to center
      }
    } else if (gameState === "Mountain") {
      if (key === "F" || key === "f") {
        inventory.push("Magical Flower"); // Add flower to inventory
        pickupSound.play(); // Play the pickup sound
        gameState = "center"; // Return to the center
      } else if (key === "R" || key === "r") {
        gameState = "center"; // Go back to center
      }
    }
  }
}

// Restart the game
function restartGame() {
  gameState = "center"; // Reset to the center room
  message = "You find yourself in a strange place... Not quite reality, and not quite fiction... In front of you, you see four paths: one leading to a lush forest (L), one to a frozen wasteland (R), one to a dark cave (C), and one to a towering mountain (M).";
  hasMemoryFragment = false; // Reset fragment status
  gameEnded = false; // Reset the game ended status
  inventory = []; // Clear inventory
}
