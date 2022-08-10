import React, {Component} from 'react';
import Node from './node/Node';

export default class PathfinderUI extends Component {
    constructor() {
      super();
      this.state = {
        grid: [],
        mouseIsPressed: false,
      };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    render() {
        const {grid, mouseIsPressed} = this.state;
    
        return (
          <div className='sections'>
            <div className='section__buttons'>
                <h1>Pathfinder Visualizer</h1>
                <p>Visualize:</p>
                <div className="buttons">
                    <button>Dijkstra's Algorithm</button>
                    <button>Minimum Spanning Tree</button>
                    <button>Random Walk</button>
                </div>
                <p>Edit Grid:</p>
                <div className="buttons">
                    <button>Clear Everything</button>
                    <button>Clear Walls</button>
                    <button>Clear Path</button>
                </div>
                <p>Generate a Maze:</p>
                <div className="buttons">
                    <button>Simple Random</button>
                    <button>Recursively Divided</button>
                    <button>Fun One</button>
                </div>
                <p>Add Weights:</p>
                <div className="buttons">
                    <button></button>
                </div>
            </div>
            <div className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                          onMouseEnter={(row, col) =>
                            this.handleMouseEnter(row, col)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                          row={row}></Node>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="section__maze">
              <h1>create maze</h1>
            </div>
            <div className='section__slider'>
              <h1>(sliders)</h1>
            </div>
          </div>
        );
      }
}

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 15;

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 20; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };