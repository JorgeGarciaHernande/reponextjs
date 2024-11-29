"use client";

import { useState } from "react";

const Prueba = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-neonGreen">
      <h1 className="text-3xl font-bold mb-4">Componente de Prueba</h1>
      <p className="text-xl mb-6">
        Este es un ejemplo básico para probar estilos y eventos.
      </p>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-red-500 text-black font-bold rounded hover:bg-red-600"
        >
          Decrementar
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-emeraldGreen text-black font-bold rounded hover:bg-emerald-600"
        >
          Incrementar
        </button>
      </div>
    </div>
  );
};

export default Prueba;
