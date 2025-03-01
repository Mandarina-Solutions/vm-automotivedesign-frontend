import { useState } from 'react';
import './search.css'
import { Articulo } from '../../models/Articulo';
import { getProductsByFilter } from '../../service/product.service';

export const Search = (
    { setParentProducts }: { setParentProducts: React.Dispatch<React.SetStateAction<Articulo[]>> }
) => {
    const [filter, setFilter] = useState("");

    async function search() {
        try {
            const products = await getProductsByFilter(filter);
            console.log([products]);
            setParentProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    function updateInput(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value);
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();//Previene el reload del form
        search();
    }

    function handleClick() {
        search();
    }

    return (
        <div >
            <form className='search' onSubmit={handleSubmit}>
                <div className="inputBusqueda">
                <input type="text" placeholder="Buscar productos"
                    value={filter} onChange={updateInput}
                />
                </div>
                <div className="lupa">
                <button onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                </button>
                </div>
            </form>
        </div>
    );
}

