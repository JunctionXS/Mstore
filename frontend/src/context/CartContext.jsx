import { createContext,useContext, useState, useEffect } from "react";

const CartContext = createContext();

 export const CartProvider = ({children}) =>{
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal]= useState(0);
   
    //fetch cart from backend
    const fetchCart = async ()=>{
    try{
        const res = await fetch(`${BASEURL}/api/cart/`); 
        if(!res.ok){
            throw new Error("failed to fetch cart");
        }
        const data = await res.json();
        setCartItems(data.items || []);
        setTotal(data.total || 0);

    } catch(error) {
        console.error('error fetching data', error);
    }
}

    useEffect(()=>{
        fetchCart();
    },[]);

    // add to cart 
    const addToCart = async (product)=>{
        try{
            await fetch(`${BASEURL}/api/cart/add/`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({product_id:product.id}),
            });
            fetchCart();

        } catch (error){
            console.log("Error in adding to cart ", error)
        }
    }

//remove product 
    const removeFromCart = async (itemId)=>{
        try{
            await fetch(`${BASEURL}/api/cart/remove/`,{
                  method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({item_id:itemId}),
            });
      fetchCart();

        }catch(error){
            console.log("error in removing item from cart", error)
        }
    };

    //update

    const updateQuantity = async (itemId, quantity)=> {
        if (quantity<1){
            await removeFromCart(itemId);
            return;
        }
        try{
            await fetch(`${BASEURL}/api/cart/update/`,{
                  method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({item_id:itemId, quantity}),
            });
      fetchCart();

        }catch(error){
            console.log("error in updating quantity", error)
        }
    }

    const clearCart = () =>{
        setCartItems([]);
        setTotal(0);
    }

    return(
        <CartContext.Provider
        value={{cartItems,total, addToCart,removeFromCart,updateQuantity,clearCart}}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart =()=>useContext(CartContext);