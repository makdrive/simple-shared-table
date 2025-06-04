import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

export default function Sheet() {
  const [cells, setCells] = useState<Record<string, string>>({});

  useEffect(() => {
    socket.on('init', (data: Record<string, string>) => setCells(data));
    socket.on('update-cell', ({ key, value }: { key: string; value: string }) => {
      setCells(prev => ({ ...prev, [key]: value }));
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setCells(prev => ({ ...prev, [key]: value }));
    socket.emit('update-cell', { key, value });
  };

  const rows = 10;
  const cols = 5;
  const letters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <table className="sheet">
      <thead>
        <tr>
          <th></th>
          {letters.map(l => (
            <th key={l}>{l}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, row) => (
          <tr key={row}>
            <th>{row + 1}</th>
            {letters.map((l, col) => {
              const key = `${l}${row + 1}`;
              return (
                <td key={col}>
                  <input
                    value={cells[key] || ''}
                    onChange={e => handleChange(key, e.target.value)}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
