import { useState } from "react";
import DisplayItem from "./DisplayItem";
import InputItem from "./InputItem";

export default function ArrayField({ field, value, onChange }) {
  const [inputValue, setInputValue] = useState("");

  const items = Array.isArray(value) ? value : [];

  const handleAddItem = () => {
    if (!inputValue) return;
    if (items.length >= field.size) {
      alert(`Maximum of ${field.size} items allowed.`);
      return;
    }
    onChange([...items, inputValue]);
    setInputValue("");
  };

  const handleRemoveItem = (idx) => {
    const newList = [...items];
    newList.splice(idx, 1);
    onChange(newList);
  };

  return (
    <div>
      {items.map((item, idx) => (
        <DisplayItem
          key={idx}
          value={item}
          onRemove={() => handleRemoveItem(idx)}
          showRemove={true}
          field={field}
        />
      ))}
      <InputItem
        field={field}
        value={inputValue}
        onChange={setInputValue}
        onAdd={handleAddItem}
      />
    </div>
  );
}
