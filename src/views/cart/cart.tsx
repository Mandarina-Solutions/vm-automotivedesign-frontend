import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Ajusta según tu configuración
import "./cart.css"; // Archivo de estilos
import { clearCart, removeFromCart, updateCantidad } from "../../redux/states/cart";
import { useEffect, useState } from "react";
import ButtonRed from "../../components/buttonRed/buttonRed";
import ButtonGreen from "../../components/buttonGreen/buttonGreen";
import { CarritoVacio } from "../../components/carritoVacio/carritoVacio";
import { mailService } from "../../service/mail.service";
import { useNavigate } from "react-router-dom";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useToast } from "../../hooks/useToast";

const CartComponent = () => {
    const articuloUser = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [precioTotal, setprecioTotal] = useState(0);
    const [mail, setMail] = useState("");

    const toast = useToast();

    const eliminarArticulo = (index: number) => {
        dispatch(removeFromCart(index));
        toast.open("Artículo eliminado del carrito", "error");

    };

    const sumar = (index: number) => {
        dispatch(updateCantidad({ index, cantidad: articuloUser[index].cantidad + 1 }));
    };
    const restar = (index: number) => {
        dispatch(updateCantidad({ index, cantidad: articuloUser[index].cantidad - 1 }));

    }

    const isValid = (email: string) => {
        return /^[a-zA-Z0-9]{2,}@[^\s@]+\.com$/.test(email);
    }


    useEffect(() => {
        var total = 0;
        articuloUser.forEach((item) => {
            total += item.precio_lista * item.cantidad;
        });
        setprecioTotal(total);
    }, [articuloUser]);

    const vaciarCarro = (compro = false) => {
        dispatch(clearCart()); 
        toast.open(compro ? "Pedido realizado con éxito verifica tu Mail" : "Se vació el carrito", compro ? "success" : "error");
    };
    

    const comprar = () => {
        if (isValid(mail)) {
            mailService.sendMail(mail, articuloUser, precioTotal);
            vaciarCarro(true);
        }
        else {
            toast.open("Mail inválido", "error");
        }
        return;
    };

    return (
        <div className="cartContainer">
            {articuloUser.length === 0 ? (
                <CarritoVacio></CarritoVacio>

            ) : (
                <>

                    <table className="cartTable">
                        <thead>
                            <tr className="cartTableHeader">
                                <th>Articulo</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articuloUser.map((item, index) => (
                                <tr key={index}>
                                    <td >
                                        <div className="articulo">
                                            <div><p>{item.titulo}</p></div>
                                            <div><img src={item.imagen} alt={item.titulo} /></div>
                                            <div><p>{item.color}</p></div>
                                            <div><p>{item.dimension_mm}</p></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contador">

                                            <Button onClick={() => restar(index)}>
                                                <RemoveCircleOutlineIcon style={{ color: 'red', fontSize: '2rem' }} ></RemoveCircleOutlineIcon>
                                            </Button>

                                            <p>{item.cantidad}</p>
                                            <Button onClick={() => sumar(index)}>
                                                <AddCircleOutlineIcon style={{ color: 'green', fontSize: "2rem" }} ></AddCircleOutlineIcon>
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="precio"><p>${item.precio_lista}</p></div>
                                    </td>
                                    <td >
                                        <div className="eliminar">
                                            <Button onClick={() => eliminarArticulo(index)}>
                                                <DeleteForeverIcon style={{ color: 'red', fontSize: '3rem' }}></DeleteForeverIcon>
                                            </Button>


                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3}><div className="precioFinal"><p>PrecioFinalPrecio Final</p></div></td>
                                <td ><div className="precioFinal"><p>${precioTotal}</p></div></td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <div className="datosMail">
                                        <p>Introduce tu e-Mail y nos contactaremos para continuar la compra</p>
                                        <input
                                            className="inputMail"
                                            type="email"
                                            placeholder="Introduce tu e-Mail"
                                            onChange={(e) => setMail(e.target.value)}
                                            value={mail}
                                        />
                                    </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>


                    <div className="guardarCancelar">
                        <ButtonRed label="Vaciar" onClick={() => vaciarCarro(false)} />

                        <ButtonGreen label="Continuar" onClick={comprar} />
                    </div>

                </>
            )}
        </div>
    );
};

export default CartComponent;
