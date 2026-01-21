import React from 'react';
import './Grid.css';

const getContrastColor = (hex) => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#000000' : '#FFFFFF';
}

export const Grid = ({ rows, cols, selectedCells, handleCellClick, config, point }) => {
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

    const renderNames = () => {
        return <div className="names">
            {config.map((block) => {
                const start = block.start.split(';');
                const end = block.end.split(';');
                const width = end[0] - start[0];
                const height = end[1] - start[1];
                const topMargin = start[1] ? start[1] * 2 : 0

                const color = selectedCells.get(`${start[1]}-${start[0]}`)

                return (
                    <div className="block"
                         style={{
                             width: `${width * 62 - 2}px`,
                             height: `${height * 62 + (height - 2) * 2}px`,
                             top: `${start[1] * 62 + topMargin}px`,
                             left: `${start[0] * 62}px`,
                             backgroundColor: color,
                             color: getContrastColor(color),
                             border: block.final ? `2px dotted red` : 'none',
                        }}
                    >
                        <div>{block.name}</div>
                        <div>{width}x{height}</div>
                        <div>{block.template}</div>
                    </div>
                )
            })}
        </div>
    }

    return <div className="grid">
        {renderGrid()}
        {renderNames()}
    </div>;
};
