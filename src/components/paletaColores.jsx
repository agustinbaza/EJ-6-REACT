import React, { useState } from 'react';

const ColorForm = () => {
  const [color, setColor] = useState('');
  const [colores, setColores] = useState([]);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setColores((prevColores) => [...prevColores, color]);
    setColor('');
  };

  const borrarColor = (index) => {
    const nuevosColores = [...colores];
    nuevosColores.splice(index, 1);
    setColores(nuevosColores);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="color-preview" style={{ backgroundColor: color }}></div>
        <input type="text" value={color} onChange={handleChange} placeholder="Ingrese un color" />
        <button type="submit">Guardar color</button>
      </form>
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

export default ColorForm;
