import React, { useEffect, useState } from "react";
import {
  consultaListaColores,
  consultaBorrarColor,
  consultaEditarColor,
} from "../helpers/queries";

const PaletaColores = () => {
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

  const borrarColor = async (id) => {
    try {
      await consultaBorrarColor(id);
      const nuevosColores = colores.filter((color) => color._id !== id);
      setColores(nuevosColores);
    } catch (error) {
      console.log(error);
    }
  };

  const editarColor = async (id, nuevoNombre) => {
    try {
      await consultaEditarColor({ nombreColor: nuevoNombre }, id);
      const nuevosColores = colores.map((color) => {
        if (color._id === id) {
          return { ...color, nombreColor: nuevoNombre };
        }
        return color;
      });
      setColores(nuevosColores);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {colores.map((color) => (
        <div key={color._id} className="color-card">
          <div
            className="color-preview"
            style={{ backgroundColor: color.nombreColor }}
          ></div>
          <div className="color-name">{color.nombreColor}</div>
          <button onClick={() => borrarColor(color._id)} className="borrar-btn">
            Borrar
          </button>
          <button
            onClick={() => {
              const nuevoNombre = prompt("Ingrese el nuevo nombre del color:");
              if (nuevoNombre) {
                editarColor(color._id, nuevoNombre);
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

export default PaletaColores;
