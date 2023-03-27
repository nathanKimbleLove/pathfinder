var PriorityQueue = function() {
  this.queue = [];
}
PriorityQueue.prototype.enqueue = function(loc, val) {
  let added = false;
  if (this.queue.length === 0) {
    this.queue.push([loc, val])
  } else {
    for (let i = 0; i < this.queue.length; i++) {
      if (val < this.queue[i][1]) {
        this.queue.splice(i, 0, [loc, val]);
        added = true;
        break;
      }
    }
    if (!added) this.queue.push([loc, val]);
  }
}
PriorityQueue.prototype.dequeue = function() {
  if (this.queue.length === 0) return null;
  return this.queue.shift();
}
PriorityQueue.prototype.start = function() {
  return this.queue[0];
}

const solve = (grid) => {
  console.log(grid);
}

const dijkstra = (g) => {
  let grid = [...g];

  const visitNeigbors = (loc, fn) => {
    const [dt, dl] = loc;
    fn([dt-1, dl], grid[dt-1]? grid[dt-1][dl] : undefined)
    fn([dt+1, dl], grid[dt+1]? grid[dt+1][dl] : undefined)
    fn([dt, dl-1], grid[dt][dl-1])
    fn([dt, dl+1], grid[dt][dl+1])
  }

  let start;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        start = [i, j];
      } else if (typeof grid[i][j] === 'object') {
        grid[i][j] = Infinity;
      } else if (grid[i][j] === 'p') {
        grid[i][j] = Infinity;
      }
    }
  }

  let q = new PriorityQueue();
  let end;
  let journey = [];
  q.enqueue(start, 0);

  while (!end && q.start()) {
    let curr = q.dequeue();

    let currVal = curr[1];
    if (typeof currVal === 'object') currVal = currVal.num;

    visitNeigbors(curr[0], (loc, val) => {
      if (val === undefined || val === 'w') {
      } else if (val === 'e') {
        console.log('i am on the end');
        end = {prev: curr[0]};
      } else if ((typeof val === 'object' && val.num > currVal + 1) || val > currVal + 1) {
        let newVal = {
          num : currVal + 1,
          loc : loc,
          prev : curr[0]
        };
        grid[loc[0]] = [...grid[loc[0]]];
        grid[loc[0]][loc[1]] = newVal;
        q.enqueue(loc, newVal);
      }
    })

    journey.push([...grid]);
  }

  if (end) {
    let curr = end;
    while (curr !== 0) {
      let prev = curr.prev;
      if (curr !== end) {
        console.log('bout to set p here',curr);
        grid[curr.loc[0]][curr.loc[1]] = 'p';
        console.log('done!', grid[curr.loc[0]][curr.loc[1]])
      }
      curr = grid[prev[0]][prev[1]];
    }
    journey.push([...grid]);
  }

  console.log(grid);
  return journey;
}

export default {
  solve : solve,
  dijkstra : dijkstra
};