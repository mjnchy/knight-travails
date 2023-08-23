const moveset = [
  [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]
];

function makeGame () {
  const board = {coordinates: {}, legalMoves: {}};

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.coordinates[JSON.stringify([i, j])] = [i, j];
    }
  }

  Object.keys(board.coordinates).forEach(cor => {
    let arr = board.legalMoves[cor] = [];

    moveset.forEach(move => {
      arr.push([move[0] + cor[0], ])
    })
  })

  return board;
};

function makeMoves (arr) {
  if (arr[0] < 0 || arr[0] > 7 || arr[1] < 0 || arr[1] > 7) return;

  let newArr = [];

  moveset.forEach(cor => {
    newArr.push([cor[0] + arr[0], cor[1] + arr[1]])
  })

  return newArr
};
