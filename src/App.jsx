import React, { useState } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Kopi', checked: true },
    { id: 2, name: 'Gula Pasir', checked: false },
    { id: 3, name: 'Air Mineral', checked: false },
    { id: 4, name: 'Air', checked: false }
  ]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newItem = {
        id: items.length + 1,
        name: inputValue,
        checked: false
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  const handleToggleCheck = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <h1>Catatan Belanjaku 📝</h1>
      <form className="add-form" onSubmit={handleAddItem}>
        <h3>Hari ini belanja apa kita?</h3>
        <div>
          <select onChange={handleInputChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            type="text"
            placeholder="nama barang..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Tambah</button>
      </form>
      <div className="list">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                defaultChecked={item.checked}
                onChange={() => handleToggleCheck(item.id)}
              />
              <span className={item.checked ? 'checked' : ''}>
                {item.name}
              </span>
              <button onClick={() => handleDeleteItem(item.id)}>&times;</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
      <footer className="stats">
        Ada {items.length} barang di daftar belanjaan,{' '}
        {items.filter((item) => item.checked).length} barang sudah dibeli (
        {(items.filter((item) => item.checked).length / items.length) * 100}
        %)
      </footer>
    </div>
  );
}
