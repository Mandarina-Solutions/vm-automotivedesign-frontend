import axios, { AxiosResponse } from "axios";
import { Articulo, ArticuloDetalle, IDimension } from "../models/Articulo";

class ProductService {
    constructor(){}

    async getAllProduct() : Promise<Articulo[]>{
        return (await axios.get<Articulo[]>('http://localhost:8080/articulos')).data;
    }

    async getProduct(id : number) : Promise<ArticuloDetalle>{
        const res = await axios.get(`http://localhost:8080/articulos/${id}`);
        const item = res.data;
        const dimensiones: string[] = item.dimensiones_mm.map((dim: IDimension) => {
            return `${dim.alto_mm} X ${dim.ancho_mm} X ${dim.profundidad_mm}`;
        });

        return new ArticuloDetalle(
            item.id, 
            item.titulo, 
            item.detalle, 
            item.precio_lista, 
            item.descuento, 
            item.categorias, 
            item.colores,
            dimensiones, 
            item.imagenes
        );
    }

}

export async function getProductsByFilter(filterValue:string) : Promise<Articulo[]>{
    const promise: Promise<AxiosResponse<Articulo[], any>> = axios.get('http://localhost:8080/articulos/filter', {params:{filter:filterValue}})
    const products = (await promise).data
    return products
}

export async function getProductsByCategory(category:string) : Promise<Articulo[]>{
    const promise: Promise<AxiosResponse<Articulo[], any>> = axios.get('http://localhost:8080/articulos/categoria', {params:{categoria:category}})
    const products = (await promise).data
    return products
}

export const productService = new ProductService();
