import {getAllNodes} from '../algorithms/dijkstra';
var openList = [];
var currentNodeGlobal;

export function astar(grid, startNode, finishNode) {
    //cases for not starting on finish node and stuff 
    let visitedList = [];
    let newNode = startNode;
    manhattanDistance(newNode);
    //openList.push(startNode);
    while (true) {
        newNode = getNextNode(newNode, grid, visitedList);
        if (newNode === finishNode) {
            return visitedList;
        }
    }
}

function setAsOpen(node) {
    node.open = true;
}

function setAsVisited(node) {
    node.isVisited = true;
}

function setAsPath() {

}

function getNextNode(node, grid, visitedList) {
    const {col, row} = node;

    setAsVisited(node);
    visitedList.push(node);
    openList = openList.filter(item => item !== node) // removing the prev node from openList

    if (row > 0) doesThisNodeQualify(grid[row - 1][col], node);
    
    if (row < grid.length - 1) doesThisNodeQualify(grid[row + 1][col], node);

    if (col > 0) doesThisNodeQualify(grid[row][col - 1], node);

    if (col < grid[0].length - 1) doesThisNodeQualify(grid[row][col + 1], node);

    return findNextNode(node);
}

function doesThisNodeQualify(node, prevNode) {
    if (node.open === false && node.isVisited === false && node.isWall === false) {
        openList.push(node);
        node.previousNode = prevNode;
        manhattanDistance(node);
    }
}

function findNextNode(node) {
    setAsOpen(node)


    let bestNodeIndex = 0
    let bestNodefCost = 999;


    for(let i = 0; i < openList.length; i++) {
        if (openList[i].fCost < bestNodefCost) {
            bestNodeIndex = i;
            bestNodefCost = openList[i].fCost;
        }
        else if (openList[i].fCost === bestNodefCost) {
            if (openList[i].gCost < openList[bestNodeIndex.gCost]) {
                bestNodeIndex = i;
            }
        }
    
    }
    let nextNode = openList[bestNodeIndex];
    //if (nextNode != null) {
       // nextNode.previousNode = node;
    //}
    return nextNode;
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

/*
export function getNodesInShortestPathOrderAstar(finishNode) {
    const nodesInShortestPathOrderAstar = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrderAstar.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrderAstar;
}
*/

export function getNodesInShortestPathOrderAstar(startNode, finishNode) {
    let currentNode = finishNode;
    const nodesInShortestPathOrderAstar = [];

    while (currentNode !== startNode) {
        currentNode = currentNode.previousNode;
        if (currentNode !== startNode) nodesInShortestPathOrderAstar.push(currentNode)
    }
    console.log(nodesInShortestPathOrderAstar)
    return nodesInShortestPathOrderAstar;
}
