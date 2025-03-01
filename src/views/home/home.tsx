import { useCallback, useEffect, useState } from "react";
import { Product } from "../../components/product/product";
import { Articulo } from "../../models/Articulo";
import './home.css';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { productService } from "../../service/product.service";
import { Search } from "../../components/search/search";

export const Home = () => {
    const userState = useSelector((store: RootState) => store.user);
    const [products, setProducts] = useState<Articulo[]>([]);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await productService.getAllProduct();
            setProducts(res)
            // console.log("Productos obtenidos: ", res);
        } catch (error) {
            // console.error("Error al obtener los productos: ", error);
        }
    }

    useEffect(() => {
        // console.log("Usuario logeado ", userState);
        fetchData()
    }, [])
    
    const listProducts = products.map((product, index) =>
        <Product key={index} product={product}></Product>
    )

    const addProduct = () =>{
        navigate('/productos/0')
    }

    return <>
        {/* <Search setParentProducts={setProducts}></Search> */}
        <div className="productsList">
                {listProducts}
                {userState.estado && 
                    <button onClick={addProduct} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path></svg>
                    </button>
                }
                
        </div>
    </>
};
