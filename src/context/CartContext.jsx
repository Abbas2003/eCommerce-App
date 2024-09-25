import { createContext, useEffect, useState } from "react";


export const CartContext = createContext()


const CartContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems')
        if(storedCartItems){
            setCartItems([...JSON.parse(storedCartItems)])
            setIsLoaded(false)
        }
    }, [])

    useEffect(() => {
        if (!isLoaded) {
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
      }, [cartItems]);


    function addToCart(item){
        const arr = [...cartItems]
        const itemIndex = arr.findIndex((data) => data.id === item.id);
        if(itemIndex == -1){
            arr.push({...item, quantity: 1})
        } else {
            arr[itemIndex].quantity += 1;
        }
        setCartItems([...arr]);
    }

    function updateCart(item, type) {
        const arr = [...cartItems];
        const itemIndex = arr.findIndex((data) => data.id === item.id);
        
        if (itemIndex !== -1) { // Ensure the item exists in the cart
            if (type === "plus") {
                arr[itemIndex].quantity++;
            } else if (type === "minus" && arr[itemIndex].quantity > 0) { 
                // Only decrement if quantity is greater than 0
                arr[itemIndex].quantity--;
            }
            
            setCartItems(arr);
        }
    }
    

    function removeFromCart(item){
        const arr = [...cartItems]
        const itemIndex = arr.findIndex((data) => data.id === item.id)
        arr.splice(itemIndex, 1)
        setCartItems([...arr])
    }

    function isItemAdded(item){
        const arr = [...cartItems]
        const itemIndex = arr.findIndex((data) => data.id === item.id)
        if(itemIndex == -1){
            return null 
        } else {
            return arr[itemIndex]
        }
    }

    function clearCart(id){
        setCartItems([])
    }


    return (
        <CartContext.Provider value={{
            addToCart,
            updateCart,
            removeFromCart,
            isItemAdded,
            clearCart,
            cartItems
        }}>
            {children}
        </CartContext.Provider>
    )
};


export default CartContextProvider;