'use client';

import { useState, useEffect } from 'react';
import months from '@/data/months';
import './globals.css';

const metas = {
  '30': 30,
  '15': 15,
  '600': 600,
};

const tipoMetaTexto = {
  '30': 'Pioneiro Auxiliar (30h/mês)',
  '15': 'Pioneiro Auxiliar (15h/mês)',
  '600': 'Pioneiro Regular (600h/ano)',
};

export default function Home() {
  const [tipoMeta, setTipoMeta] = useState('30');
  const [horas, setHoras] = useState({});

  const handleHorasChange = (mes, valor) => {
    const novoValor = parseInt(valor) || 0;
    setHoras(prev => ({ ...prev, [mes]: novoValor }));
  };

  const calcularProgresso = () => {
    const total = Object.values(horas).reduce((acc, h) => acc + (h || 0), 0);
    if (tipoMeta === '600') {
      let acumulado = 0;
      for (let i = 0; i < months.length; i++) {
        acumulado += horas[months[i].id] || 0;
        if (acumulado >= 600) {
          return `Meta de 600h será alcançada em: ${months[i].nome}`;
        }
      }
      return 'Meta de 600h ainda não foi alcançada';
    }
    return '';
  };

  return (
    <div className="app-container">
      <h1>Planejador de Horas do Pioneiro</h1>
      <select value={tipoMeta} onChange={(e) => setTipoMeta(e.target.value)}>
        <option value="30">Pioneiro Auxiliar (30h/mês)</option>
        <option value="15">Pioneiro Auxiliar (15h/mês)</option>
        <option value="600">Pioneiro Regular (600h/ano)</option>
      </select>

      <div className="grid">
        {months.map(mes => (
          <div key={mes.id} className="mes-card">
            <strong>{mes.nome}</strong>
            <input
              type="number"
              value={horas[mes.id] || ''}
              onChange={(e) => handleHorasChange(mes.id, e.target.value)}
            />
            {tipoMeta !== '600' && (
              <div className="status">
                {horas[mes.id] >= metas[tipoMeta] ? '✅' : '❌'}
              </div>
            )}
          </div>
        ))}
      </div>

      {tipoMeta === '600' && (
        <div className="resumo">
          <strong>{calcularProgresso()}</strong>
        </div>
      )}
    </div>
  );
}