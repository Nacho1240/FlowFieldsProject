# Flow Field Particle System

A simple particle system with a flow field effect using HTML5 Canvas and JavaScript.

## Description

This project creates a flow field particle system on an HTML5 canvas. Each particle is influenced by a flow field, resulting in dynamic and visually appealing patterns. You can customize the number of particles, cell size, zoom, and curve parameters to create different effects.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/lexO-dat/flow-field-particle-system.git
    ```

2. Open `index.html` in your web browser.

## Usage

1. Open `index.html` in a web browser.
2. Experiment with the flow field parameters using the commented-out input elements (`zoomInput` and `curveInput`) in the HTML file.
3. Observe the mesmerizing patterns created by the flow field particle system.

## Customization

Adjust the following parameters in the `Effect` class to customize the visual output:

- `numberParticles`: Number of particles in the system.
- `cellSize`: Size of each cell in the flow field.
- `zoom`: Zoom factor affecting the flow field.
- `curve`: Curve factor influencing the flow field.

- Adjust the trigonometric functions in the `Effect` class to influence the flow field (line 94):

    ```javascript
    // Customize the trigonometric functions or experiment with another func
    this.xSpeed = Math.cos(angle);
    this.ySpeed = Math.sin(angle);
    ```
