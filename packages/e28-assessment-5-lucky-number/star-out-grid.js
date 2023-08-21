function starOutGrid(grid) {
    let locations = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == '*') {
                locations.push([i, j]);
            }
        }
    }
    for (let loc of locations) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (i == loc[0] || j == loc[1]) {
                    grid[i][j] = '*';
                }
            }
        }
    }
    return grid;
}