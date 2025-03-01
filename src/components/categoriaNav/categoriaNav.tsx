import { useState, useEffect, useRef } from "react";
import { CategoriaType } from "../../models/Categoria";
import './categoriaNav.css'

type CategoriaProps = {
    listCategoria: CategoriaType[];
};

export const CategoriaNav = ({ listCategoria }: CategoriaProps) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const clickDetectado = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", clickDetectado);
        return () => {
            document.removeEventListener("mousedown", clickDetectado);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <p className="dropdown-trigger" onClick={() => setMenuVisible(!menuVisible)}>
                Categorías ▼
            </p>
            {menuVisible && (
                <div className="dropdown-menu">
                    {listCategoria.map((categoria: CategoriaType) => (
                        <span key={categoria.id} className="dropdown-item">
                            {categoria.nombre}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
