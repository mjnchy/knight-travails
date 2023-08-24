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
  if (startCor[0] === endCor[0] && startCor[1] === endCor[1]) return 0;

  const queue = [startCor];
  const visited = {};
  const predObj = {};
  const movesArr = [];
  let loopOuter = true;

  while (loopOuter === true) {
    const currentCor = queue.shift();
    const key = board.legalMoves[JSON.stringify(currentCor)];

    for (let i = 0; i < key.length; i++) {
      if (visited[key[i]] === true) continue;

      visited[key[i]] = true;
      predObj[key[i]] = currentCor;

      if (key[i][0] !== endCor[0] || key[i][1] !== endCor[1]) queue.push(key[i])
      else {
        let loop = true;
        let result = key[i];
        movesArr.push(result);
        
        while (loop === true) {
          if (result[0] === startCor[0] && result[1] === startCor[1]) {
            loop = false;
            break;
          } else {
            result = predObj[result];
            movesArr.push(result);
          };
        }
        loopOuter = false;
        break;
      }
    }
  }

  let msg = `You made it in ${movesArr.length - 1} moves. Here is your path: ${JSON.stringify(movesArr.reverse()).slice(1, -1)}`

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
