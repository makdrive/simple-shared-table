import React from 'react';

const Spreadsheet = () => {
  // Simple 5x5 grid
  const rows = 5;
  const cols = 5;

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const rowCells = [];
      for (let j = 0; j < cols; j++) {
        rowCells.push(
          <td key={`col-${j}`} style={{ border: '1px solid #ddd', padding: '8px', minWidth: '80px', height: '30px', textAlign: 'left' }}>
            {/* Cell ${String.fromCharCode(65 + j)}${i + 1} */}
          </td>
        );
      }
      grid.push(<tr key={`row-${i}`}>{rowCells}</tr>);
    }
    return grid;
  };

  return (
    <div style={{ width: '75%', padding: '10px', height: '100vh', boxSizing: 'border-box', overflow: 'auto' }}>
      <h2>Spreadsheet</h2>
      <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, index) => (
              <th key={`header-${index}`} style={{ border: '1px solid #ddd', padding: '8px', background: '#f0f0f0' }}>
                {String.fromCharCode(65 + index)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderGrid()}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
