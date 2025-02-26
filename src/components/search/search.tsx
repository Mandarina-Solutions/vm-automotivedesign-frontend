import { useEffect, useState } from 'react';
import './search.css'
import { Articulo } from '../../models/Articulo';
import { getProductsByCategory, getProductsByFilter } from '../../service/product.service';
import { useParams } from "react-router"
import { SearchModeState } from '../../views/home/home';


export const Search = (
    { setParentProducts, searchMode }: { setParentProducts: React.Dispatch<React.SetStateAction<Articulo[]>>, searchMode: SearchModeState }
) => {
    const [filter, setFilter] = useState("");

    let categoryRouteParam = useParams()

    async function searchByTitle() {
        try {
            const products = await getProductsByFilter(filter);
            console.log([products]);
            setParentProducts(products);

        } catch (error) {
            console.log(error);
        }
    }

    async function searchByCategory(category: string) {
        try {
            const products = await getProductsByCategory(category);
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
        event.preventDefault(); //Previene el reload del form
        searchByTitle();
    }

    function handleClick() {
        searchByTitle();
    }

    useEffect(() => {
        if (categoryRouteParam.category) {
            searchByCategory(categoryRouteParam.category)
        } else {
            searchByTitle()
        }
        console.log(categoryRouteParam)
    }, [categoryRouteParam])

    return (
        <div className='search'>
            <div>Categoria seleccionada: {categoryRouteParam.category}</div>
            <form action="" onSubmit={handleSubmit}>
                    
                    <input type="text" placeholder="Busca un producto"
                        value={filter} onChange={updateInput}
                    />
                    <button onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                        </svg>
                    </button>
            </form>
            {/* {searchMode == 'byTitle' &&
                
            }

            {searchMode == 'byCategory' &&
                
            } */}

        </div>
    );
}

