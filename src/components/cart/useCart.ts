import { useCallback, useEffect, useMemo, useState } from "react";
import { ICart } from "../../types/cart";
import data from "../../goods";

const LS_KEY = "cart-tems";

function getInitialState(): ICart {
  let output: ICart = {
    items: [],
  };

  try {
    const cartItems = localStorage.getItem(LS_KEY);

    if (cartItems) {
      output = {
        ...output,
        items: JSON.parse(cartItems),
      };
    }
  } catch (e) {}

  return output;
}

function useCart() {
  const [cart, setCart] = useState<ICart>(getInitialState);

  const addToCart = useCallback(
    (itemId: string) => {
      let newItems: ICart["items"] = [...cart.items];

      const existingProduct = newItems.find((item) => item.id === itemId);

      if (existingProduct) {
        newItems = newItems.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        });
      } else {
        newItems.push({
          id: itemId,
          count: 1,
        });
      }

      const cartCounter = newItems.reduce((acc, item) => acc + item.count, 0);

      if (cartCounter > 20) {
        alert("Извините, все слоты заполнены");
      } else {
        setCart({
          items: newItems,
        });
      }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      let newItems: ICart["items"] = [...cart.items];

      const existingProduct = newItems.find((item) => item.id === itemId);

      if (existingProduct) {
        newItems = newItems.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              count: item.count - 1,
            };
          }
          return item;
        });
      }

      setCart({
        items: newItems.filter((item) => item.count > 0),
      });
    },
    [cart]
  );

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(cart.items));
  }, [cart.items]);

  const cartTotalCount = useMemo(() => {
    return cart.items.reduce((acc, item) => {
      const good = data.find((g) => g.id === item.id);

      if (!good) {
        return acc;
      }

      return acc + item.count;
    }, 0);
  }, [cart]);

  const cartTotalPrice = useMemo(() => {
    return cart.items.reduce((acc, item) => {
      const good = data.find((g) => g.id === item.id);

      if (!good) {
        return acc;
      }

      return acc + item.count * good.cost;
    }, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    cartTotalCount,
    cartTotalPrice,
  };
}

export default useCart;
