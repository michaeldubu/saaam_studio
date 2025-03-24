# SAAAM Language and Game Studio

A development environment for the SAAAM (Simple and Accessible Architecture for Awesome Mechanics) programming language and game engine. This project provides a complete IDE and game studio for creating, editing, and testing games with the SAAAM language.

## Features

### SAAAM IDE
- Syntax highlighting for SAAAM language
- Code validation and error checking
- Game preview and testing
- Asset management
- Coroutine flow visualization

### Game Studio
- Level editor with drag-and-drop interface
- Game object management (player, platforms, enemies, collectibles)
- Level testing and simulation
- Level import/export functionality

## Project Structure

```
├── 📂 public
│   ├── index.html
├── 📂 src
│   ├── 📂 components
│   │   ├── SaaamIDE.jsx            # SAAAM language IDE component
│   │   ├── GameStudio.jsx          # Game level editor/studio component
│   │   ├── SaaamApp.jsx            # Main container component
│   │   ├── SaaamStudioDemo.jsx     # Demo wrapper
│   │   ├── App.jsx                 # Root application component
│   ├── 📂 engine
│   │   ├── gameEngine.js           # SAAAM game engine implementation
│   ├── index.js                    # Application entry point
│   ├── index.css                   # Global styles
├── .gitignore
├── package.json
├── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/michaeldubu/saaam_studio.git
   cd saaam_studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to `http://localhost:3000`

## SAAAM Language

SAAAM is a clean, intuitive language designed specifically for game development. It features:

- Simple, easy-to-learn syntax
- Powerful vector types (vec2, vec3)
- Built-in coroutine support with `yield`
- Event/signal system
- State machine system
- Physics API
- Hot reloading support

## Example SAAAM Code

```javascript
// Player movement script
var player_speed = 5;
const GRAVITY = 0.5;

function create() {
  // Initialize your game object
  this.position = vec2(100, 100);
  this.velocity = vec2(0, 0);
}

function step() {
  // Apply gravity
  this.velocity.y += GRAVITY;
  
  // Handle input
  if (keyboard_check(vk_right)) {
    this.velocity.x = player_speed;
  } else if (keyboard_check(vk_left)) {
    this.velocity.x = -player_speed;
  } else {
    this.velocity.x = 0;
  }
  
  // Apply velocity
  this.position += this.velocity;
  
  // Check if on ground
  if (this.position.y > 550) {
    this.position.y = 550;
    this.velocity.y = 0;
    
    // Jump if space pressed
    if (keyboard_check_pressed(vk_space)) {
      this.velocity.y = -10;
    }
  }
}

function draw() {
  // Rendering code
  draw_sprite(sprite_index, image_index, this.position.x, this.position.y);
}
```

# SAAAM Language Tutorial

## Introduction to SAAAM

Welcome to SAAAM (Simple and Accessible Architecture for Awesome Mechanics), a domain-specific language designed specifically for game development. SAAAM makes it easy for both beginners and experienced developers to create engaging 2D games with an intuitive syntax and powerful built-in features.

This tutorial will guide you through the basics of SAAAM, starting with simple concepts and progressing to more complex game mechanics. By the end, you'll have the knowledge to create your own games using the SAAAM language and engine.

## Setting Up

To start using SAAAM, you'll need:

1. The SAAAM Game Studio (which includes the SAAAM code editor and engine)
2. A basic understanding of programming concepts

If you haven't installed SAAAM Game Studio yet, download it from [saaamstudio.com](https://saaamstudio.com) and follow the installation instructions.

## Your First SAAAM Program

Let's start with the classic "Hello, World!" example to get familiar with SAAAM:

```saaam
// My first SAAAM program
SAAAM.registerCreate(create);
SAAAM.registerDraw(draw);

function create() {
  console.log("Hello, World!");
}

function draw(ctx) {
  draw_text("Hello, SAAAM World!", 400, 300, "#FFFFFF");
}
```

Save this code as `hello.saaam` and run it with SAAAM Game Studio. You should see the text "Hello, SAAAM World!" displayed in the center of the screen, and "Hello, World!" logged to the console.

### Understanding the Basics

Let's break down what's happening:

1. We register two of SAAAM's lifecycle functions, `create` and `draw`, with the engine
2. The `create` function runs once when the game starts
3. The `draw` function runs every frame to render content to the screen
4. We use the built-in `draw_text` function to display text

## Moving Objects

Now let's create a simple moving square:

```saaam
// Moving square example
SAAAM.registerCreate(create);
SAAAM.registerStep(step);
SAAAM.registerDraw(draw);

// Game object
var square = {
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  color: "#4488FF",
  speed: 200
};

function create() {
  // Initialization code (empty for now)
}

function step(deltaTime) {
  // Move square with arrow keys
  if (keyboard_check(vk_right)) {
    square.x += square.speed * deltaTime;
  }
  if (keyboard_check(vk_left)) {
    square.x -= square.speed * deltaTime;
  }
  if (keyboard_check(vk_up)) {
    square.y -= square.speed * deltaTime;
  }
  if (keyboard_check(vk_down)) {
    square.y += square.speed * deltaTime;
  }
  
  // Keep square on screen
  if (square.x < 0) square.x = 0;
  if (square.x + square.width > 800) square.x = 800 - square.width;
  if (square.y < 0) square.y = 0;
  if (square.y + square.height > 600) square.y = 600 - square.height;
}

function draw(ctx) {
  // Clear the screen
  draw_rectangle(0, 0, 800, 600, "#222222");
  
  // Draw the square
  draw_rectangle(square.x, square.y, square.width, square.height, square.color);
  
  // Draw instructions
  draw_text("Use arrow keys to move", 400, 30, "#FFFFFF");
}
```

When you run this code, you should see a blue square that you can move around using the arrow keys.

### Key Concepts Introduced

1. The `step` function is called every frame and is used for game logic
2. The `deltaTime` parameter represents the time elapsed since the last frame
3. We use `keyboard_check` to detect key presses
4. We multiply movement by `deltaTime` to ensure consistent speed regardless of frame rate

## Adding Collectibles

Let's expand our game by adding collectibles that the player can gather:

```saaam
// Collectible game example
SAAAM.registerCreate(create);
SAAAM.registerStep(step);
SAAAM.registerDraw(draw);

// Player object
var player = {
  x: 400,
  y: 300,
  width: 40,
  height: 40,
  speed: 200,
  color: "#4488FF"
};

// Game variables
var collectibles = [];
var score = 0;
var gameTime = 0;

function create() {
  // Spawn initial collectibles
  for (var i = 0; i < 5; i++) {
    spawnCollectible();
  }
}

function step(deltaTime) {
  // Update game time
  gameTime += deltaTime;
  
  // Handle player movement
  handlePlayerMovement(deltaTime);
  
  // Update and check collectibles
  updateCollectibles(deltaTime);
}

function draw(ctx) {
  // Clear the screen
  draw_rectangle(0, 0, 800, 600, "#222222");
  
  // Draw collectibles
  for (var i = 0; i < collectibles.length; i++) {
    var c = collectibles[i];
    draw_rectangle(c.x, c.y, c.width, c.height, c.color);
  }
  
  // Draw player
  draw_rectangle(player.x, player.y, player.width, player.height, player.color);
  
  // Draw score
  draw_text("Score: " + score, 20, 30, "#FFFFFF");
}

// Handle player movement
function handlePlayerMovement(deltaTime) {
  if (keyboard_check(vk_right) || keyboard_check(vk_d)) {
    player.x += player.speed * deltaTime;
  }
  if (keyboard_check(vk_left) || keyboard_check(vk_a)) {
    player.x -= player.speed * deltaTime;
  }
  if (keyboard_check(vk_up) || keyboard_check(vk_w)) {
    player.y -= player.speed * deltaTime;
  }
  if (keyboard_check(vk_down) || keyboard_check(vk_s)) {
    player.y += player.speed * deltaTime;
  }
  
  // Keep player on screen
  player.x = Math.max(0, Math.min(800 - player.width, player.x));
  player.y = Math.max(0, Math.min(600 - player.height, player.y));
}

// Update collectibles and check collisions
function updateCollectibles(deltaTime) {
  for (var i = collectibles.length - 1; i >= 0; i--) {
    var c = collectibles[i];
    
    // Make collectibles bob up and down
    c.y = c.baseY + Math.sin(gameTime * c.bobSpeed) * 10;
    
    // Check for collision with player
    if (checkCollision(player, c)) {
      // Remove collectible
      collectibles.splice(i, 1);
      
      // Increase score
      score += 100;
      
      // Play sound
      if (play_sound) {
        play_sound("collect");
      }
      
      // Spawn a new collectible
      spawnCollectible();
    }
  }
}

// Spawn a collectible at a random position
function spawnCollectible() {
  var collectible = {
    x: 50 + Math.random() * 700,
    y: 50 + Math.random() * 500,
    baseY: 0,
    width: 20,
    height: 20,
    color: "#FFDD44",
    bobSpeed: 1 + Math.random() * 2
  };
  
  collectible.baseY = collectible.y;
  collectibles.push(collectible);
}

// Check collision between two rectangles
function checkCollision(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}
```

This example introduces several new concepts:

1. Creating and managing multiple game objects (collectibles)
2. Implementing collision detection
3. Keeping score
4. Using time-based animation for the bobbing effect
5. Breaking code into functions for better organization

## Adding Visual Polish

Let's enhance our game with better visuals:

```saaam
// Enhanced collectible game with visual effects
SAAAM.registerCreate(create);
SAAAM.registerStep(step);
SAAAM.registerDraw(draw);

// Player object with enhanced properties
var player = {
  x: 400,
  y: 300,
  width: 40,
  height: 40,
  speed: 200,
  color: "#4488FF",
  trailParticles: [],
  rotation: 0
};

// Game variables
var collectibles = [];
var particles = [];
var score = 0;
var gameTime = 0;

function create() {
  // Spawn initial collectibles
  for (var i = 0; i < 5; i++) {
    spawnCollectible();
  }
}

function step(deltaTime) {
  // Update game time
  gameTime += deltaTime;
  
  // Handle player movement
  handlePlayerMovement(deltaTime);
  
  // Update and check collectibles
  updateCollectibles(deltaTime);
  
  // Update particles
  updateParticles(deltaTime);
}

function draw(ctx) {
  // Draw a gradient background
  drawBackground(ctx);
  
  // Draw collectibles
  drawCollectibles(ctx);
  
  // Draw player
  drawPlayer(ctx);
  
  // Draw particles
  drawParticles(ctx);
  
  // Draw score
  draw_text("Score: " + score, 20, 30, "#FFFFFF");
}

function drawBackground(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
  gradient.addColorStop(0, "#1a1a2e");
  gradient.addColorStop(1, "#16213e");
  draw_rectangle(0, 0, 800, 600, gradient);
  
  // Draw some stars
  for (var i = 0; i < 50; i++) {
    var x = (Math.sin(i * 3.14159 + gameTime * 0.2) * 400) + 400;
    var y = (Math.cos(i * 3.14159 + gameTime * 0.3) * 300) + 300;
    
    var brightness = Math.sin(gameTime * 2 + i) * 0.5 + 0.5;
    var alpha = 0.3 * brightness;
    var size = 2 + brightness * 2;
    
    draw_circle(x, y, size, `rgba(255, 255, 255, ${alpha})`);
  }
}

function handlePlayerMovement(deltaTime) {
  var movingX = false;
  var movingY = false;
  
  if (keyboard_check(vk_right) || keyboard_check(vk_d)) {
    player.x += player.speed * deltaTime;
    movingX = true;
    player.rotation = 0;
  }
  if (keyboard_check(vk_left) || keyboard_check(vk_a)) {
    player.x -= player.speed * deltaTime;
    movingX = true;
    player.rotation = Math.PI;
  }
  if (keyboard_check(vk_up) || keyboard_check(vk_w)) {
    player.y -= player.speed * deltaTime;
    movingY = true;
    if (!movingX) player.rotation = -Math.PI/2;
  }
  if (keyboard_check(vk_down) || keyboard_check(vk_s)) {
    player.y += player.speed * deltaTime;
    movingY = true;
    if (!movingX) player.rotation = Math.PI/2;
  }
  
  // Set diagonal rotation
  if (movingX && movingY) {
    if (keyboard_check(vk_left) || keyboard_check(vk_a)) {
      if (keyboard_check(vk_up) || keyboard_check(vk_w)) {
        player.rotation = -3*Math.PI/4;
      } else {
        player.rotation = 3*Math.PI/4;
      }
    } else {
      if (keyboard_check(vk_up) || keyboard_check(vk_w)) {
        player.rotation = -Math.PI/4;
      } else {
        player.rotation = Math.PI/4;
      }
    }
  }
  
  // Create trail particles if moving
  if (movingX || movingY) {
    createTrailParticle();
  }
  
  // Keep player on screen
  player.x = Math.max(0, Math.min(800 - player.width, player.x));
  player.y = Math.max(0, Math.min(600 - player.height, player.y));
}

function createTrailParticle() {
  // Only create particles sometimes
  if (Math.random() > 0.3) return;
  
  // Calculate position at the center-back of the player
  var offsetX = -Math.cos(player.rotation) * player.width/2;
  var offsetY = -Math.sin(player.rotation) * player.height/2;
  
  var particle = {
    type: "trail",
    x: player.x + player.width/2 + offsetX,
    y: player.y + player.height/2 + offsetY,
    size: 5 + Math.random() * 5,
    color: `rgba(${68 + Math.random()*30}, ${136 + Math.random()*30}, ${255}, 0.7)`,
    life: 0.5,
    maxLife: 0.5,
    vx: -Math.cos(player.rotation) * (10 + Math.random() * 20),
    vy: -Math.sin(player.rotation) * (10 + Math.random() * 20)
  };
  
  particles.push(particle);
}

function drawPlayer(ctx) {
  ctx.save();
  
  // Move to player center
  ctx.translate(player.x + player.width/2, player.y + player.height/2);
  
  // Rotate according to movement direction
  ctx.rotate(player.rotation);
  
  // Draw a spaceship shape instead of a square
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.moveTo(player.width/2, 0);
  ctx.lineTo(-player.width/2, player.height/3);
  ctx.lineTo(-player.width/3, 0);
  ctx.lineTo(-player.width/2, -player.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Add a cockpit
  ctx.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
