//Make a 2D array with (arrCols) collumns and (arrRows) rows
function createGrid(arrCols, arrRows) {
  let array = [];
  for (let x = -1; x <= arrCols + 2; x++) {
    array[x] = [];
    for (let y = -1; y <= arrRows + 2; y++) {
      array[x][y] = 0;
    }
  }
  return array;
}

//Count neighbours of a specific cell
//params: grid = the table
//        x and y = the position of the cell in the table
//        cellType = the type of cell that has to be counted
//        method = the type of neighbourhood. Can be "moore", "von neumann", "von neumann extended"
function countNeighbours(x, y, cellType, method) {
  let count = 0;
  if (method == "moore") {

    if (grid[x + 1][y    ] === cellType) {count++;}
    if (grid[x + 1][y - 1] === cellType) {count++;}
    if (grid[x    ][y - 1] === cellType) {count++;}
    if (grid[x - 1][y - 1] === cellType) {count++;}
    if (grid[x - 1][y    ] === cellType) {count++;}
    if (grid[x - 1][y + 1] === cellType) {count++;}
    if (grid[x    ][y + 1] === cellType) {count++;}
    if (grid[x + 1][y + 1] === cellType) {count++;}

    return count;
  }
  else if (method == "von neumann") {

    if (grid[x + 1][y] === cellType) {count++;}
    if (grid[x][y - 1] === cellType) {count++;}
    if (grid[x - 1][y] === cellType) {count++;}
    if (grid[x][y + 1] === cellType) {count++;}

    return count;
  }
  else if (method == "von neumann extended") {

    if (grid[x + 1][y] === cellType) {count++;}
    if (grid[x][y - 1] === cellType) {count++;}
    if (grid[x - 1][y] === cellType) {count++;}
    if (grid[x][y + 1] === cellType) {count++;}

    if (grid[x + 2][y] === cellType) {count++;}
    if (grid[x][y - 2] === cellType) {count++;}
    if (grid[x - 2][y] === cellType) {count++;}
    if (grid[x][y + 2] === cellType) {count++;}

    return count;
  }
  else {
    return 0;
  }
}
