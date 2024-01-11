import React from "react";
import { Tbody } from "./Tbody";

export const Table = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" scope="col">Nombre</th>
          <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" scope="col">Descripción</th>
          <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" scope="col">Precio</th>
          <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" scope="col">Imagen</th>
          <th className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green-dark" scope="col">Acción</th>
        </tr>
      </thead>
      <Tbody />
    </table>
  );
};

