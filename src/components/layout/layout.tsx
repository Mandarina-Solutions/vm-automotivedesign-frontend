import { Outlet, useLocation } from "react-router-dom";
import './layout.css'
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Nav } from "../nav/nav";
import { DondeEstoy } from "../dondeEstoy/dondeEstoy";
import { Search } from "../search/search";
import { useEffect, useState } from "react";
import { ToastProvider } from "../../context/toast.context";

export const Layout = () => {

    const [titulo, setTitulo] = useState<string>('');
    const { pathname: pat } = useLocation();
    const pathNames: { [key: string]: string } = {
        'productos': 'Productos',
        '/productos/:id': 'Detalle de Producto',
        '/productos/': 'Detalle de Producto',
        '/quienSoy': 'Quien Soy',
        '/carrito': 'Carrito',
    };

    const convertirPat = () => {
        for (const key in pathNames) {
            if (pat.includes(key)) {
                setTitulo(pathNames[key]);
            }
        }
    }

    useEffect(() => {
        convertirPat();
    }, [pat]);

    return (
        <div className="layout">
            <Header />
            <Nav /> {/* categorias / search */}
            <DondeEstoy titulo={titulo} />
            <ToastProvider>
                <Outlet />{/* home antes -> barra */}
            </ToastProvider>
            <Footer />
        </div>
    );
};
