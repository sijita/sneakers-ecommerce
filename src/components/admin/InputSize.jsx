export default function InputSize({ value, handleSizeSelection, checked }) {
  return (
    <div className="flex gap-2 text-base-200">
      <input
        className="checkbox"
        type="checkbox"
        value={value}
        onChange={handleSizeSelection}
        checked={checked}
      />
      {value}
    </div>
  );
}
