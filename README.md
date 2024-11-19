# Simple Learning Agent

Simple implementation of a learning agent that learns to play Tic-Tac-Toe, developed for practice.
The agent logs all previous movements together with a rating, depending if the movement led to a win or a loss.
It learns by first trying out all possible moves until confident enough, then always selecting the highest rated move from the generated table.

## Usage

- Install node.js on your machine
- Clone the repository
- Run `npm install` in the project's root folder
- Run `npm run build` to build the TypeScript code
- Run `npm run start` to start the agent and watch its plays against a simple enemy in the console