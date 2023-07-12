import React from 'react';

const PaletaColores = ({ colores, borrarColor }) => {
  return (
    <div>
      {colores.map((color, index) => (
        <div key={index} className="color-card">
          <div className="color-preview" style={{ backgroundColor: color }}></div>
          <div className="color-name">{color}</div>
          <button onClick={() => borrarColor(index)} className="borrar-btn">Borrar</button>
        </div>
      ))}
    </div>
  );
};

export default PaletaColores;
