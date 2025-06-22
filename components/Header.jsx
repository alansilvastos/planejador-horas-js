export default function Header({ selected, setSelected }) {
  return (
    <div className="header">
      <h1>Planejador de Horas</h1>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="regular">Pioneiro Regular (600h/ano)</option>
        <option value="aux30">Pioneiro Auxiliar (30h/mês)</option>
        <option value="aux15">Pioneiro Auxiliar (15h/mês)</option>
      </select>
    </div>
  );
}