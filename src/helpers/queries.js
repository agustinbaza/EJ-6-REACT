const URLColor = import.meta.env.VITE_API_COLOR;

export const consultaListaColores = async () => {
  try {
    const respuesta = await fetch(URLColor);
    const listaColores = await respuesta.json();
    return listaColores;
  } catch (error) {
    console.log(error);
  }
};

export const consultaColor = async (id) => {
  try {
    const respuesta = await fetch(URLColor + "/" + id);
    const color = await respuesta.json();
    return color;
  } catch (error) {
    console.log(error);
  }
};

export const consultaBorrarColor = async (id) => {
  try {
    const respuesta = await fetch(`${URLColor}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const consultaAgregarColor = async (color) => {
  try {
    const respuesta = await fetch(URLColor, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const consultaEditarColor = async (color, id) => {
  try {
    const respuesta = await fetch(URLColor + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
