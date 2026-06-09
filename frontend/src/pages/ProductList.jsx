import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";


function ProductList(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;  // fix 1 & 2
    useEffect(()=>{
        fetch(`${BASEURL}/api/products/`)
        .then((response)=> {
            if(!response.ok){
                throw new Error("failed to fetch ");
            }
            return response.json();
        })
        .then ((data)=>{
            setProducts(data);
            setLoading(false)
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        })
    },[]);

    if (loading){
        return <div>loading.....</div>
    }

    if (error){
        return <div>Error : {error} </div>
    }

    return (                              // fix 3 — missing return
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center py-6 bg-white shadow-md mt-16">Product list</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.length > 0 ? (
                    products.map((product)=>(
                        <ProductCard key={product.id} product={product}/>
                    ))                    // fix 4 — missing closing ))
                ) : (
                    <p className="col-span-full text-center text-gray-500"> no product available </p>
                )}
            </div>
        </div>
    )
}

export default ProductList;