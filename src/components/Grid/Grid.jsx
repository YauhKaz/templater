import React from 'react';
import './Grid.css';

export const Grid = ({ rows, cols, selectedCells, handleCellClick, point }) => {
    const renderGrid = () => {
        let grid = [];
        for (let row = 0; row < rows; row++) {
        let cells = [];
        for (let col = 0; col < cols; col++) {
            const cellId = `${row}-${col}`;
            const color = selectedCells.get(cellId);
            const isPoint = point && point.row === row && point.col === col;
            cells.push(
            <div
                key={cellId}
                className="cell"
                style={{
                backgroundColor: color || 'transparent',
                }}
                onClick={() => handleCellClick(row, col)}
            >
                {isPoint && (
                <div
                    className="point"
                />
                )}
            </div>
            );
        }
        grid.push(<div key={row} className="row">{cells}</div>);
        }
        return grid;
    };

    return <div className="grid">{renderGrid()}</div>;
};
