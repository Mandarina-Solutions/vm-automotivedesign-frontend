import { NavLink } from 'react-router-dom';
import './nav.css';
import { categoriaService } from '../../service/categoria.service';
import { SetStateAction, useEffect, useState } from 'react';
import { CategoriaType } from '../../models/Categoria';
import { CategoriaNav } from '../categoriaNav/categoriaNav';
import { Search } from '../search/search';
import { Articulo } from '../../models/Articulo';
import { Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { cartSize } from '../../redux/states/cart';

const StyledBadge = Badge;


export const Nav = () => {
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);
    const carritoSize = useSelector(cartSize)

    const fetchDataNav = async () => {
        try {
            const res = await categoriaService.getCategoriaNav();
            setCategorias(res);
            console.log('categorias nav ', categorias);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataNav();
    }, []);

    return (
        <nav>
            <div className="links">
                <div className="enlaces">
                    <div>
                            <NavLink to={`/productos`}>
                                <p>Productos</p>
                            </NavLink>
                    </div>
                    <div>
                        <NavLink to={`/productos`}>
                            <CategoriaNav listCategoria={categorias}></CategoriaNav>
                        </NavLink>
                    </div>
                    <div>
                            <NavLink to={`/quienSoy`}>
                                <p>Quien soy</p>
                            </NavLink>
                    </div>
                </div>
                <div className="burger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                </div>
                <div className='containerNombre'>
                    <NavLink to={`/productos`}>
                        <img className="nombreEmprendimiento" src="../src/assets/title.jpeg" alt="" />
                    </NavLink>
                </div>

                <div className="carrito">
                    <div className='searchResponsive'>
                        <Search setParentProducts={function (value: SetStateAction<Articulo[]>): void {
                            throw new Error('Function not implemented.')
                        }}></Search>
                    </div>
                    <div className="chango">
                        <IconButton aria-label="cart" >
                            <NavLink to={`/carrito`}>
                                <StyledBadge anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }} badgeContent={carritoSize} color="error">
                                    <ShoppingCartIcon sx={{color: 'black'}} />
                                </StyledBadge>
                            </NavLink>
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className="animacionImagenes">
                <div className="vacioIzquierda"></div>

                <div className="izquierda">
                    <img src="../src/assets/logo.jpeg" alt="" />
                </div>
                <div className="derecha">
                    <img src="../src/assets/logo.jpeg" alt="" />
                </div>

                <div className="vacioDerecha"></div>
            </div>
        </nav>
    );
};
