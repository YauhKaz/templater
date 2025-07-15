import React, { useState } from 'react';
import { Controls } from '../Controls/Controls';
import { Grid } from '../Grid/Grid';
import { ConfigOutput } from '../ConfigOutput/ConfigOutput';
import { WarningMessage } from '../WarningMessage/WarningMessage';
import './Layout.css';

export const Layout = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [selectedCells, setSelectedCells] = useState(new Map());
  const [firstClick, setFirstClick] = useState(null);
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [warning, setWarning] = useState("");
  const [point, setPoint] = useState(null);
  const [config, setConfig] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("S1");
  const [isFinal, setIsFinal] = useState(false);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const saveToHistoryAndConfig = (newSelectedCells, rowStart, rowEnd, colStart, colEnd) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(new Map(newSelectedCells));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    const index = config.length + 1;
    const updatedConfig = [...config, {
      name: `cell_${index}`,
      start: `${rowStart};${colStart}`,
      end: `${rowEnd + 1};${colEnd + 1}`,
      template: selectedTemplate,
      final: isFinal
    }];
    setConfig(updatedConfig);
  };

  const undo = () => {
    if (historyIndex >= 0) {
      const newIndex = historyIndex - 1;
      const prevState = newIndex >= 0 ? history[newIndex] : new Map();
      setSelectedCells(new Map(prevState));
      setHistoryIndex(newIndex);
      setConfig(config.slice(0, newIndex + 1));
      setWarning("");
    }
  };

  const clearGrid = () => {
    setSelectedCells(new Map());
    setHistory([]);
    setHistoryIndex(-1);
    setConfig([]);
    setFirstClick(null);
    setPoint(null);
    setIsFinal(false);
    setWarning("");
  };

  const checkIntersection = (rowStart, rowEnd, colStart, colEnd) => {
    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = colStart; c <= colEnd; c++) {
        const cellId = `${r}-${c}`;
        if (selectedCells.has(cellId)) {
          return true;
        }
      }
    }
    return false;
  };

  const handleCellClick = (row, col) => {
    const cellId = `${row}-${col}`;

    if (!firstClick) {
      if (selectedCells.has(cellId)) {
        setWarning("Ошибка: Ячейка уже закрашена!");
        return;
      }
      setWarning("");
      setFirstClick({ row, col });
      setPoint({ row, col });
      return;
    }

    const { row: firstRow, col: firstCol } = firstClick;
    const rowStart = Math.min(firstRow, row);
    const rowEnd = Math.max(firstRow, row);
    const colStart = Math.min(firstCol, col);
    const colEnd = Math.max(firstCol, col);

    if (checkIntersection(rowStart, rowEnd, colStart, colEnd)) {
      setWarning("Ошибка: Область пересекается с ранее выделенной!");
      setFirstClick(null);
      setPoint(null);
      return;
    }

    const newSelectedCells = new Map(selectedCells);
    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = colStart; c <= colEnd; c++) {
        newSelectedCells.set(`${r}-${c}`, currentColor);
      }
    }

    saveToHistoryAndConfig(newSelectedCells, rowStart, rowEnd, colStart, colEnd);
    setSelectedCells(newSelectedCells);
    setFirstClick(null);
    setCurrentColor(getRandomColor());
    setPoint(null);
    setWarning("");
  };

  return (
    <div className="layout">
      <WarningMessage message={warning} />
      <div className="wrapper">
        <Controls
          rows={rows}
          cols={cols}
          setRows={setRows}
          setCols={setCols}
          selectedCells={selectedCells}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          isFinal={isFinal}
          setIsFinal={setIsFinal}
          undo={undo}
          historyIndex={historyIndex}
          clearGrid={clearGrid}
        />
        <Grid
          rows={rows}
          cols={cols}
          selectedCells={selectedCells}
          handleCellClick={handleCellClick}
          point={point}
        />
        <ConfigOutput config={config} />
      </div>
    </div>
  );
};
