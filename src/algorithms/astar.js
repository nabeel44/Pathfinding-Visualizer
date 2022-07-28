import {getAllNodes} from '../algorithms/dijkstra';

export function astar (grid, startNode, finishNode) {
    applyManhattanDistance(grid);
    const visitedNodesInOrderAstar = [];
    startNode.fCost = 0;
    startNode.gCost = 0;
    startNode.hCost = 0;
    const unvisitedNodesAstar = getAllNodes(grid);
    while(!!unvisitedNodesAstar.length) {
        sortNodesByDistance(unvisitedNodesAstar);
        const closestNode = unvisitedNodesAstar.shift();
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrderAstar;
        closestNode.isVisited = true;
        visitedNodesInOrderAstar.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrderAstar;
        updateVisitedNeighborsAstar(closestNode, grid);

    }
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
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


function sortNodesByDistance(unvisitedNodesAstar) {
    unvisitedNodesAstar.sort((function(nodeA, nodeB) {
        if (nodeA.fCost === nodeB.fCost) {
            return nodeA.gCost - nodeB.gCost;
        }
        return nodeA.fCost - nodeB.fCost
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
}

function applyManhattanDistance(grid) {
    const allNodes = getAllNodes(grid);
    for (const node of allNodes) {
        manhattanDistance(node);
    }
}

export function getNodesInShortestPathOrderAstar(finishNode) {
    const nodesInShortestPathOrderAstar = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrderAstar.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrderAstar;
 }