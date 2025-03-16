import React, { useState, useEffect } from 'react';
import { Split, Play, Square, Bug, Save, Download, Upload, RefreshCw } from 'lucide-react';

const SaaamIDE = () => {
  const [code, setCode] = useState(`// Welcome to SAAAM IDE
// Try writing some game code below!

var player_health = 100;
const GRAVITY = 0.5;

function create() {
  // Initialize your game object
  this.position = vec2(100, 100);
  this.speed = 5;
}

function step() {
  // Update logic runs every frame
  if (keyboard_check(vk_right)) {
    this.position.x += this.speed;
  }
  
  if (keyboard_check(vk_left)) {
    this.position.x -= this.speed;
  }
}

function draw() {
  // Rendering code
  draw_sprite(sprite_index, image_index, this.position.x, this.position.y);
}
`);
  const [activeTab, setActiveTab] = useState('editor');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([
    { type: 'info', message: '> SAAAM IDE initialized' },
    { type: 'info', message: '> Ready to code!' }
  ]);
  const [showCoroutineVisualizer, setShowCoroutineVisualizer] = useState(false);

  // Function to handle running code
  const runCode = () => {
    setRunning(true);
    setOutput('');
    setConsoleOutput(prev => [
      ...prev,
      { type: 'info', message: '> Running SAAAM code...' }
    ]);

    // Simulate code parsing & execution
    setTimeout(() => {
      const errors = validateCode(code);
      if (errors.length > 0) {
        setConsoleOutput(prev => [
          ...prev,
          { type: 'error', message: '> Compilation failed:' },
          ...errors.map(err => ({ type: 'error', message: `  ${err}` }))
        ]);
      } else {
        setConsoleOutput(prev => [
          ...prev, 
          { type: 'success', message: '> Code compiled successfully!' },
          { type: 'info', message: '> Game initialized' },
          { type: 'info', message: '> Running game loop...' }
        ]);
        
        // Simulate game execution
        setOutput('Game running in canvas (simulation)');
      }
      setRunning(false);
    }, 1000);
  };

  // Simple code validation
  const validateCode = (code) => {
    const errors = [];
    const lines = code.split('\n');
    
    // Check for basic syntax errors (very simplified)
    lines.forEach((line, i) => {
      // Check for missing semicolons on statements
      if (line.trim() && !line.trim().startsWith('//') && 
          !line.includes('{') && !line.includes('}') && 
          !line.endsWith(';') && !line.trim().endsWith(')')) {
        errors.push(`Line ${i+1}: Missing semicolon`);
      }
      
      // Check for mismatched parentheses
      const openCount = (line.match(/\(/g) || []).length;
      const closeCount = (line.match(/\)/g) || []).length;
      if (openCount !== closeCount) {
        errors.push(`Line ${i+1}: Mismatched parentheses`);
      }
    });
    
    return errors;
  };

  // Stop the running code
  const stopCode = () => {
    setRunning(false);
    setConsoleOutput(prev => [
      ...prev,
      { type: 'info', message: '> Execution stopped by user' }
    ]);
  };

  // Toggle the coroutine visualizer
  const toggleCoroutineVisualizer = () => {
    setShowCoroutineVisualizer(!showCoroutineVisualizer);
    if (!showCoroutineVisualizer) {
      setConsoleOutput(prev => [
        ...prev,
        { type: 'info', message: '> Showing coroutine execution flow' }
      ]);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-yellow-400">SAAAM IDE</span>
          <span className="px-2 py-1 text-xs bg-gray-700 rounded">v1.0</span>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded flex items-center ${running ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            onClick={running ? stopCode : runCode}
          >
            {running ? 
              <><Square className="w-4 h-4 mr-1" /> Stop</> : 
              <><Play className="w-4 h-4 mr-1" /> Run</>}
          </button>
          <button 
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 flex items-center"
          >
            <Bug className="w-4 h-4 mr-1" /> Debug
          </button>
          <button 
            className={`px-3 py-1 rounded flex items-center ${showCoroutineVisualizer ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'}`}
            onClick={toggleCoroutineVisualizer}
          >
            <RefreshCw className="w-4 h-4 mr-1" /> {showCoroutineVisualizer ? 'Hide Flow' : 'Show Flow'}
          </button>
          <button className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 flex items-center">
            <Save className="w-4 h-4 mr-1" /> Save
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Project files */}
        <div className="w-48 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-2 font-semibold text-sm text-gray-400">PROJECT FILES</div>
          <div className="px-2">
            <div className="flex items-center p-1 rounded bg-blue-800 text-white mb-1">
              <span className="text-sm">📄 main.saaam</span>
            </div>
            <div className="flex items-center p-1 rounded hover:bg-gray-700 cursor-pointer">
              <span className="text-sm">📄 player.saaam</span>
            </div>
            <div className="flex items-center p-1 rounded hover:bg-gray-700 cursor-pointer">
              <span className="text-sm">📄 enemy.saaam</span>
            </div>
            <div className="flex items-center p-1 rounded hover:bg-gray-700 cursor-pointer">
              <span className="text-sm">📄 physics.saaam</span>
            </div>
          </div>
          
          <div className="p-2 font-semibold text-sm text-gray-400 mt-4">ASSETS</div>
          <div className="px-2">
            <div className="flex items-center p-1 rounded hover:bg-gray-700 cursor-pointer">
              <span className="text-sm">🖼️ sprites/</span>
            </div>
            <div className="flex items-center p-1 rounded hover:bg-gray-700 cursor-pointer">
              <span className="text-sm">🔊 sounds/</span>
            </div>
            <div className="flex items-center p-1 rounded hover:bg-gray-700 cursor-pointer">
              <span className="text-sm">🏞️ rooms/</span>
            </div>
          </div>
        </div>

        {/* Main editor area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex bg-gray-800 border-b border-gray-700">
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'editor' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('editor')}
            >
              Code Editor
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'game' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('game')}
            >
              Game Preview
            </button>
          </div>

          {/* Editor or Game view */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'editor' ? (
              <div className="h-full overflow-auto bg-gray-900 p-2">
                <textarea 
                  className="w-full h-full bg-gray-900 text-gray-100 font-mono p-2 resize-none focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                ></textarea>
              </div>
            ) : (
              <div className="h-full flex flex-col bg-black items-center justify-center">
                {showCoroutineVisualizer ? (
                  <div className="w-full h-full p-4 overflow-auto bg-gray-800">
                    <div className="text-white text-center text-lg font-bold mb-4">Coroutine Flow Visualization</div>
                    <div className="bg-gray-900 p-4 rounded mx-auto max-w-lg">
                      <div className="text-center mb-4">
                        <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded mb-2">Game Loop Start</div>
                        <div className="h-6 border-l-2 border-gray-500 mx-auto"></div>
                      </div>
                      
                      <div className="bg-gray-800 border border-gray-700 p-3 rounded mb-4">
                        <div className="text-yellow-400 font-bold mb-2">Patrol Coroutine</div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="bg-blue-600 p-2 rounded">Move to Point A</div>
                          <div className="text-gray-400">yield</div>
                          <div className="bg-blue-600 p-2 rounded">Wait 2s</div>
                          <div className="text-gray-400">yield</div>
                          <div className="bg-blue-600 p-2 rounded">Move to Point B</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-700 p-2 rounded mb-2">Process Coroutines</div>
                        <div className="h-6 border-l-2 border-gray-500"></div>
                        <div className="bg-green-600 p-2 rounded mb-2">Resume Execution</div>
                        <div className="h-6 border-l-2 border-gray-500"></div>
                        <div className="bg-gray-700 p-2 rounded mb-2">Render Frame</div>
                        <div className="h-6 border-l-2 border-gray-500"></div>
                        <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded">Game Loop End</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-800 border border-gray-700 w-4/5 h-3/4 flex items-center justify-center">
                      {running ? (
                        <div className="text-center">
                          <div className="text-xl text-yellow-400">Game Running</div>
                          <div className="text-sm text-gray-400 mt-2">Game canvas preview would appear here</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-xl text-gray-500">Game Not Running</div>
                          <div className="text-sm text-gray-600 mt-2">Press "Run" to start the game</div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Console output */}
          <div className="h-40 bg-gray-800 border-t border-gray-700 overflow-y-auto">
            <div className="flex items-center justify-between px-2 py-1 bg-gray-900">
              <span className="text-sm font-semibold">Console</span>
              <button 
                className="text-sm text-gray-400 hover:text-white"
                onClick={() => setConsoleOutput([])}
              >
                Clear
              </button>
            </div>
            <div className="p-2 font-mono text-sm">
              {consoleOutput.map((entry, index) => (
                <div 
                  key={index} 
                  className={`${entry.type === 'error' ? 'text-red-400' : 
                               entry.type === 'success' ? 'text-green-400' : 
                               'text-gray-300'}`}
                >
                  {entry.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar - Properties and documentation */}
        <div className="w-64 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-2">
            <div className="text-sm font-semibold text-gray-400 mb-2">PROPERTIES</div>
            
            <div className="border border-gray-700 rounded mb-4">
              <div className="bg-gray-700 px-2 py-1 text-sm font-medium">Game Object</div>
              <div className="p-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Position</span>
                  <span className="text-sm text-gray-400">x: 100, y: 100</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Speed</span>
                  <span className="text-sm text-gray-400">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Health</span>
                  <span className="text-sm text-gray-400">100</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm font-semibold text-gray-400 mb-2">DOCUMENTATION</div>
            <div className="bg-gray-900 p-2 rounded text-sm">
              <h3 className="text-yellow-400 font-bold">SAAAM Language</h3>
              <p className="mt-1 text-gray-300">A clean, intuitive language for game development.</p>
              
              <h4 className="text-yellow-400 font-medium mt-3">Quick Reference</h4>
              <ul className="mt-1 space-y-1 list-disc pl-4 text-gray-300">
                <li>var/let - Variable declaration</li>
                <li>const - Constant declaration</li>
                <li>vec2, vec3 - Vector types</li>
                <li>yield - Pause coroutine</li>
                <li>signals - Event system</li>
              </ul>
              
              <div className="mt-3">
                <a href="#" className="text-blue-400 hover:underline">View Full Documentation</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-2 py-1 bg-blue-800 text-white text-xs">
        <div>Ready</div>
        <div className="flex space-x-4">
          <span>Line: 12</span>
          <span>Col: 4</span>
          <span>SAAAM v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default SaaamIDE;
