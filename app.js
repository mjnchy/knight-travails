const BOARD_SIZE = 8;
const moveset = [
  [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]
];

const board = {coordinates: {}, legalMoves: {}};


(() => {
  const coordinateKeys = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const key = JSON.stringify([i, j]);
      coordinateKeys.push(key);
      board.coordinates[key] = [i, j];
    }
  }

  
  coordinateKeys.forEach(key => {
    const arr = board.legalMoves[key] = [];
    const cor = JSON.parse(key);

    moveset.forEach(move => {
      let x = move[0] + cor[0], y = move[1] + cor[1];
      if (x >= 0  && x <= 7 && y >= 0 && y <= 7) arr.push([x, y]); 
    })
  })

  return board;
})();

function knightMoves (startCor, endCor) {
  if (!Array.isArray(startCor) || !Array.isArray(endCor) ||startCor.length !== 2 || endCor.length !== 2)
  return "invalid paramneters, coordinates have to be arrays [x, y]";

  const queue = [startCor];
  const pred = {};
  const movesArr = [];

  while (queue.length) {
    let currentCor = queue.shift();
    let key = board.legalMoves[JSON.stringify(currentCor)];

    for (let i = 0; i < key.length; i++) {
      pred[key[i]] = currentCor;

      if (key[i][0] === endCor[0] && key[i][1] === endCor[1]) {
        let output = key[i];
        movesArr.push(output);

        let end = false;

        while (end === false) {
          output = pred[output];
          movesArr.push(output);
          
          if (output[0] === startCor[0] && output[1] === startCor[1]) {
            end = true;
            break;
          };
        }

        queue.length = 0;
        break;
      } else queue.push(key[i]);
    }
  }
  
  let msg = `You made it in ${movesArr.length - 1} moves. Here is your path:`

  return msg;
};


// Take start point and push it to a queue
// if start point and end point are connected by an edge, return 1
// else return all possible outputs from the start and pop the start point from the queue,
// push all outputs in the queue,
// take the first item from the queue again which will be the new start point,
// see if the new start point and the end point are connected by an edge,
// if so, return the original start point, the new start point and the end point;
// if not, push all possible outputs for this startpoint to the queue and pop it off,
// repeat again for the new first item in the queue (this item will have been a child of the original start point);
