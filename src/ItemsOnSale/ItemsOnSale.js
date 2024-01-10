import React from 'react';
import './ItemsOnSale.css';

const ItemsOnSale = () => {
  // Items on sale logic here (e.g., array of items on sale with multiple attributes)
  const itemsOnSale = [
    { 
      id: 1, 
      name: 'Sale Item 1', 
      price: 30, 
      description: 'This is a great sale item!', 
      image: 'item1.jpg' 
    },
    { 
      id: 2, 
      name: 'Sale Item 2', 
      price: 40, 
      description: 'Amazing discount on this item!', 
      image: 'item2.jpg' 
    },
    { 
      id: 3, 
      name: 'Sale Item 3', 
      price: 50, 
      description: 'Amazing discount on this item!', 
      image: 'item3.jpg' 
    },
    { 
      id: 4, 
      name: 'Sale Item 4', 
      price: 40, 
      description: 'This is a great sale item!', 
      image: 'item4.jpg' 
    },
    { 
      id: 5, 
      name: 'Sale Item 5', 
      price: 40, 
      description: 'Amazing discount on this item!', 
      image: 'item5.jpg' 
    },
    { 
      id: 6, 
      name: 'Sale Item 6', 
      price: 50, 
      description: 'Amazing discount on this item!', 
      image: 'item6.jpg' 
    },
    // Add more items on sale with additional attributes
  ];

  return (
    <div className="items-on-sale-container">
      <div className="section-heading">Items on Sale</div>
      <div className="items-on-sale">
        <div className="sale-items">
          {itemsOnSale.map((item) => (
            <div key={item.id} className="sale-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>{item.description}</p>
                {/* Add more item attributes */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsOnSale;
