# Simple Learning Agent

Simple implementation of a learning agent that learns to play Tic-Tac-Toe, developed for practice.
The agent logs all previous movements together with a rating, depending if the movement led to a win or a loss.
It learns by first trying out all possible moves until confident enough, then always selecting the highest rated move from the generated table.

Both competing agents learn all of the moves surprisingly fast, 
and then figure out how to always land a draw.

## Usage

- Install node.js on your machine
- Clone the repository
- Run `npm install` in the project's root folder
- Run `npm run build` to build the TypeScript code
- Run `npm run start` to start the agent and watch its plays against itself in the console

If you want to change the amount of games the agent is training/playing, just change the `trainingCycles` variable in the `index.ts` file and build the project again.