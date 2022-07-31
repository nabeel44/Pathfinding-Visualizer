import {getAllNodes} from '../algorithms/dijkstra';

export function astar (grid, startNode, finishNode) {
    const openList = [];
    openList.push(startNode);
    //applyManhattanDistance(grid);
    const visitedNodesInOrderAstar = [];
    const unvisitedNodesAstar = getAllNodes(grid);
    let step = 0;
    let closestNode = startNode;
    startNode.distance = 0;
    while(!!unvisitedNodesAstar.length) {
        step++
        closestNode = findBestNodeFromOpenList(closestNode, grid, openList,);
        //sortNodesByCost(unvisitedNodesAstar);
        //let closestNode = unvisitedNodesAstar.shift();
        if (closestNode.isWall) {
            continue;
        }
        //if (closestNode.distance === Infinity) return visitedNodesInOrderAstar;
        closestNode.isVisited = true;
        visitedNodesInOrderAstar.push(closestNode);
        if (closestNode === finishNode) {
            return visitedNodesInOrderAstar;
        }
        updateVisitedNeighborsAstar(closestNode, grid);

    }
}

function findBestNodeFromOpenList(node, grid, openList,){

    //NEED To REMOVE THE CURRENT NODE
    console.log(node);
    openList = openList.filter(item => item !== node);

    let neighbors = getUnvisitedNeighborsAstar(node, grid);

    for (const neighbor of neighbors) {
        manhattanDistance(neighbor);
        neighbor.checked = true;
        openList.push(neighbor);
    }

    let bestIndex = 0;
    let bestCost = 999;
    let currentNode;
    for (let i = 0; i < openList.length; i++) {
        if (openList[i].fCost < bestCost) {
            bestIndex = i;
            bestCost = openList[i].fCost;
        }
        else if (openList[i].fCost === bestCost) {
            if (openList[i].gCost < openList[bestIndex].gCost) {
                bestIndex = i;
            }
        }
        }
    currentNode = openList[bestIndex];
    return currentNode;
    }

function updateVisitedNeighborsAstar(node, grid) {
    const unvisitedNeighborsAstar = getUnvisitedNeighborsAstar(node, grid);
    for (const neighbor of unvisitedNeighborsAstar) {
        neighbor.previousNode = node;
    }

} 

function getUnvisitedNeighborsAstar(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0){
        if (grid[row-1][col].checked == false) neighbors.push(grid[row - 1][col]);}
    if (row < grid.length - 1){
        if (grid[row+1][col].checked == false) neighbors.push(grid[row + 1][col]);}
    if (col > 0){
        if (grid[row][col - 1].checked ==false) neighbors.push(grid[row][col - 1]);}
    if (col < grid[0].length - 1){
        if (grid[row][col + 1].checked == false) neighbors.push(grid[row][col + 1])}
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


function sortNodesByCost(unvisitedNodesAstar) {
    unvisitedNodesAstar.sort((function(nodeA, nodeB) {
        if (nodeA.fCost !== nodeB.fCost) {
            return nodeA.fCost - nodeB.fCost;
        }
        if (nodeA.fCost === nodeB.fCost) {
            return nodeA.fCost - nodeB.fCost;
        }
    }))
}

function manhattanDistance(node) {
    const start_col = 15;
    const start_row = 10;
    const finish_col = 35;
    const finish_row = 10;

    const {col, row} = node;

    //calculate gCost g(n) is the distance between the start node and the current node
    let xDistance = Math.abs(col - start_col);
    let yDistance = Math.abs(row - start_row);
    node.gCost = xDistance + yDistance;

    //calculate hCost h(n) is the distance between the current node and the finish node
    xDistance = Math.abs(col - finish_col);
    yDistance = Math.abs(row - finish_row);
    node.hCost = xDistance + yDistance;

    //calculate fCost f(n) is the sum of gCost and hCost
    node.fCost = node.hCost + node.gCost;

    /*if (node.isWall) {
        node.fCost = 999;
        node.gCost = 999;
    }
*/
}

function applyManhattanDistance(grid) {
    const allNodes = getAllNodes(grid);
    for (const node of allNodes) {
        const {col, row} = node;
        manhattanDistance(node);
    }
}

function getNodesInShortestPathOrderAstar(finishNode) {
    const nodesInShortestPathOrderAstar = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrderAstar.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrderAstar;
 }

 function GetClosestNode(unvisitedNodesAstar,grid) {
    let nodes = getAllNodes(grid);
    let currentClosest, index;
    for (let i = 0; i < unvisitedNodesAstar.length; i++) {
      if (!currentClosest || currentClosest.fCost > nodes[unvisitedNodesAstar[i]].fCost) {
        currentClosest = nodes[unvisitedNodesAstar[i]];
        index = i;
      } else if (currentClosest.fCost === nodes[unvisitedNodesAstar[i]].f) {
        if (currentClosest.gCost > nodes[unvisitedNodesAstar[i]].gCost) {
          currentClosest = nodes[unvisitedNodesAstar[i]];
          index = i;
        }
      }
    }
    unvisitedNodesAstar.splice(index, 1);
    return currentClosest;
}