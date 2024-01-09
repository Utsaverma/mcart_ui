import React from 'react';
import './ItemsOnSale.css';

const ItemsOnSale = () => {
  // Items on sale logic here (e.g., array of items on sale)
  const itemsOnSale = [
    { id: 1, name: 'Sale Item 1', price: 30 },
    { id: 2, name: 'Sale Item 2', price: 40 },
    // Add more items on sale
  ];

  return (
    <div className="items-on-sale">
      <h2>Items on Sale</h2>
      <ul>
        {itemsOnSale.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsOnSale;
