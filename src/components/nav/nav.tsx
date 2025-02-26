import { NavLink } from 'react-router-dom'
import './nav.css'
import { CategoriaNav } from '../categoriaNav/categoriaNav'


export const Nav = () => {

    return (
        <nav>
            <div className="links">
                <div className="enlaces">
                    <NavLink to={`/productos/buscar`}>
                        <p>Productos</p>
                    </NavLink>
                    <CategoriaNav></CategoriaNav>
                    <NavLink to={`/quienSoy`}>
                        <p>¿Quien Soy?</p>
                    </NavLink>
                </div>
                <div className="burger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                </div>
                <div className='containerNombre'>
                    <img className="nombreEmprendimiento" src="../src/assets/title.jpeg" alt="" />
                </div>

                <div className="carrito">
                    <NavLink to={`/carrito`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="#000000" viewBox="0 0 256 256"><path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path></svg>
                    </NavLink>
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
    )
}