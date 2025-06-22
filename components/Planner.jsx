import { useState } from 'react';

const goals = {
  regular: 600,
  aux30: 360,
  aux15: 180,
};

export default function Planner({ goal }) {
  const start = new Date('2025-09-01');
  const end = new Date('2026-08-31');
  const months = [];
  const totalGoal = goals[goal];

  let current = new Date(start);
  while (current <= end) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  const [monthly, setMonthly] = useState(Array(months.length).fill(0));
  const total = monthly.reduce((a, b) => a + b, 0);

  const handleChange = (e, i) => {
    const updated = [...monthly];
    updated[i] = Number(e.target.value);
    setMonthly(updated);
  };

  const cumulative = monthly.reduce((acc, val, idx) => {
    const sum = (acc.length ? acc[acc.length - 1] : 0) + val;
    acc.push(sum);
    return acc;
  }, []);

  const reachedIndex = cumulative.findIndex(sum => sum >= totalGoal);

  return (
    <div className="planner">
      {months.map((date, i) => {
        const label = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
        return (
          <div key={i} className={i === reachedIndex ? 'month highlight' : 'month'}>
            <strong>{label}</strong>
            <input type="number" value={monthly[i]} onChange={(e) => handleChange(e, i)} />
          </div>
        );
      })}
      <p>Total: {total} / {totalGoal} horas</p>
    </div>
  );
}