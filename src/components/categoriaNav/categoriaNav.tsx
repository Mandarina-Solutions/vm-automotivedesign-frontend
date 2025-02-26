import { useEffect, useState } from "react";
import { CategoriaType } from "../../models/Categoria";
import './categoriaNav.css'
import { categoriaService } from "../../service/categoria.service";
import { useNavigate } from "react-router-dom";



export const CategoriaNav = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const [categorys, setCategorys] = useState<{ id: number, nombre: string }[]>([])

    const navigate = useNavigate();
    
    const fetchDataNav = async () => {
        try {
            const res = await categoriaService.getCategoriaNav();
            setCategorys(res)
        }
        catch (error: unknown) {
            console.log(error)
        }
    }

    function validNavigation(categoryToNavigate:string){
        const categorysNames = categorys.map(category=>category.nombre)
        console.log(categorysNames)
        console.log(categoryToNavigate)
        console.log(categorysNames.includes(categoryToNavigate))
        return categorysNames.includes(categoryToNavigate)
    }
    function navigateToCategory(category:string){
        if(!validNavigation(category)){
            navigate(`/productos/buscar`)
        }else{
            navigate(`/productos/${category.toLocaleLowerCase()}`)
        }
    }

    useEffect(() => {
        fetchDataNav()
    }, [])

    return (
        <div className="dropdown">
            <p className="dropdown-trigger" onClick={() => setMenuVisible(!menuVisible)}>
                Categorías ▼
            </p>
            {menuVisible && (
                    <div className="dropdown-menu">
                        {categorys.map((categoria: CategoriaType) => (
                            <div key={categoria.id} className="dropdown-item" onClick={() => { navigateToCategory(categoria.nombre) }}>
                                {categoria.nombre}
                            </div>

                        ))}
                    </div>


            )}
        </div>
    )
}
