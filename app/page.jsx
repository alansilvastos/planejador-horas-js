'use client';

import { useState } from 'react';
import FormularioHoras from '../components/FormularioHoras';

export default function Home() {
  const [tipoSelecionado, setTipoSelecionado] = useState('regular');

  return (
    <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Planejador de Horas do Pioneiro
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            tipoSelecionado === 'regular'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setTipoSelecionado('regular')}
        >
          Pioneiro Regular
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tipoSelecionado === 'auxiliar30'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setTipoSelecionado('auxiliar30')}
        >
          Auxiliar 30h
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tipoSelecionado === 'auxiliar15'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setTipoSelecionado('auxiliar15')}
        >
          Auxiliar 15h
        </button>
      </div>

      <FormularioHoras tipo={tipoSelecionado} />
    </main>
  );
}
