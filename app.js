let moveset = [
  [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]
];

function knighMoves (cor) {
  moveset.forEach(move => {
    console.log([cor[0] + move[0], cor[1] + move[1]]);
  });
};
