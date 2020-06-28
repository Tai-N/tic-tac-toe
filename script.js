const Gameboard = (() => {
  const board = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];

  board.forEach((mark) => {
    let grids = document.getElementsByClassName("grid");
    for (let i = 0; i < grids.length; i++) {
      grids[i].innerHTML = mark;
    }
  });
})();

const DisplayController = (() => {})();

const Player = () => {};
