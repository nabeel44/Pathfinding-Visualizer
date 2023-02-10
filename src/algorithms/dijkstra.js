export function dijkstra(grid, startNode, finishNode) {
    let visitedNodesInOrder = [];
    startNode.distance = 0;
    const nodesSortedByDistance = getAllNodes(grid);
    let iterations = 0;
    while (true && iterations < 10000) {
        iterations += 1;
      sortNodesByDistance(nodesSortedByDistance);
      const currentNode = nodesSortedByDistance.shift();
      if (currentNode == null) continue;
      if (currentNode.isWall) continue;
      if (currentNode.distance === Infinity) return visitedNodesInOrder;
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      if (currentNode === finishNode) return visitedNodesInOrder;
      setNeighborsNewDistance(currentNode, grid);
    }
  }

  // chaneg for commit
  function sampelcreate(){
    let x = 2
  }

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function setNeighborsNewDistance(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);

    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

    if (col > 0) neighbors.push(grid[row][col - 1]);

    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  export function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
