interface SelectLimitProps {
  currentLimit: number;
  onLimitChange: (newLimit: number) => void;
}

export const SelectLimit = ({ currentLimit, onLimitChange }: SelectLimitProps) => {
  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    onLimitChange(newLimit);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Mostrar:</span>
      <select
        value={currentLimit}
        onChange={handleLimitChange}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value={4}>4</option>
        <option value={6}>6</option>
        <option value={8}>8</option>
        <option value={10}>10</option>
      </select>
    </div>
  );
};