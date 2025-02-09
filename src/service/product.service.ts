import axios from "axios";
import { Articulo } from "../models/Articulo"

export async function getAllProducts(){
    const response = await axios.get<Articulo[]>('http://localhost:8080/articulos')
    return response.data
}

export async function getProduct(id : number){
    return (await axios.get<Articulo>(`http://localhost:8080/articulos/${id}`)).data
}

