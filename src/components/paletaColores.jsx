import React, { useState, useEffect } from "react";
import {
  consultaListaColores,
  consultaAgregarColor,
  consultaBorrarColor,
  consultaEditarColor,
} from "../helpers/queries";

const ColorForm = () => {
  const [color, setColor] = useState("");
  const [colores, setColores] = useState([]);

  useEffect(() => {
    obtenerColores();
  }, []);

  const obtenerColores = async () => {
    try {
      const listaColores = await consultaListaColores();
      setColores(listaColores);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await consultaAgregarColor({ nombreColor: color });
      setColor("");
      obtenerColores();
    } catch (error) {
      console.log(error);
    }
  };

  const borrarColor = async (index, id) => {
    try {
      await consultaBorrarColor(id);
      const nuevosColores = [...colores];
      nuevosColores.splice(index, 1);
      setColores(nuevosColores);
    } catch (error) {
      console.log(error);
    }
  };

  const editarColor = async (index, id, nuevoNombre) => {
    try {
      await consultaEditarColor({ nombreColor: nuevoNombre }, id);
      const nuevosColores = [...colores];
      nuevosColores[index].nombreColor = nuevoNombre;
      setColores(nuevosColores);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="color-preview" style={{ backgroundColor: color }}></div>
        <input
          type="text"
          value={color}
          onChange={handleChange}
          placeholder="Ingrese un color"
        />
        <button type="submit">Guardar color</button>
      </form>
      {colores.map((color, index) => (
        <div key={color._id} className="color-card">
          <div
            className="color-preview"
            style={{ backgroundColor: color.nombreColor }}
          ></div>
          <div className="color-name">{color.nombreColor}</div>
          <button
            onClick={() => borrarColor(index, color._id)}
            className="borrar-btn"
          >
            Borrar
          </button>
          <button
            onClick={() => {
              const nuevoNombre = prompt("Ingrese el nuevo nombre del color:");
              if (nuevoNombre) {
                editarColor(index, color._id, nuevoNombre);
              }
            }}
            className="editar-btn"
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ColorForm;
