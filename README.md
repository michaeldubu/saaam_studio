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
   git clone https://github.com/yourusername/saaam-language.git
   cd saaam-language
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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
