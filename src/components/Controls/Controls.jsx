import React from 'react';
import './Controls.css';

export const Controls = ({
  rows, cols, setRows, setCols,
  selectedCells,
  selectedTemplate, setSelectedTemplate,
  isFinal, setIsFinal,
  undo, historyIndex,
  clearGrid
}) => {
  const templates = ["S1", "S2", "S3", "S4", "M1", "M2", "L1"];
  const inputsDisabled = selectedCells.size > 0;

  return (
    <div className="controls">
      <h4>Настройки</h4>

      <div>
        <label>
          <p>Rows:</p>
          <input
            type="number"
            value={rows}
            min={1}
            disabled={inputsDisabled}
            onChange={(e) => setRows(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          <p>Columns:</p>
          <input
            type="number"
            value={cols}
            min={1}
            disabled={inputsDisabled}
            onChange={(e) => setCols(parseInt(e.target.value))}
          />
        </label>
      </div>

      <h4>Шаблон:</h4>
      <div className="templates">
        {templates.map((template) => (
          <label key={template}>
            <input
              type="radio"
              value={template}
              checked={selectedTemplate === template}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            />
            {template}
          </label>
        ))}
        <label className="finalState">
          <input
            type="checkbox"
            checked={isFinal}
            onChange={(e) => setIsFinal(e.target.checked)}
          />
          Final state
        </label>
      </div>

      <button className="button" onClick={undo} disabled={historyIndex < 0}>Undo</button>
      <button className="button" onClick={clearGrid}>Clear</button>
    </div>
  );
};
