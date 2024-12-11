import React, { createContext, useState, useContext } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (item, quantity) => {
    setBasketItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (basketItem) => basketItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        const basketItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: quantity,
        };
        return [...prevItems, basketItem];
      }
    });
  };

  const removeFromBasket = (itemId) => {
    setBasketItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBasket(itemId);
      return;
    }

    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const getBasketTotal = () => {
    return basketItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    basketItems,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
    getBasketTotal,
    getItemCount,
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

export default BasketContext;
