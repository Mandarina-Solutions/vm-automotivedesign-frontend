//  ########################################################
//  PRODUCT BASE STRUCTURE
//  ########################################################
type ProductBasePivot =  {
    id:number,
    titulo:string,
    imagen_1:string,
    precio_lista:number,
    descuento?:number
}
class ProductBase {
    constructor(
        public id:number = 0,
        public title:string = "",
        public image_1:string = "",
        public price:number = 0,
        public discount:number = 0
    ){}
}

//  ########################################################
//  PRODUCT HOME STRUCTURE
//  ########################################################
export type ProductCardHomeJSON = ProductBasePivot & {
    detalle:string,
    colores:Array<number>
}

export class ProductCardHome extends ProductBase {
    constructor(
        public detail: string = "",
        public colors: Array<number> = [], 
        ...inheritedParams: ConstructorParameters<typeof ProductBase>
    ) {
        super(...inheritedParams);
    }
}

export function productHomeFromJSON(data: ProductCardHomeJSON): ProductCardHome{
    return Object.assign(new ProductCardHome(), data);
}
//  ########################################################
//  PRODUCT DETAIL STRUCTURE
//  ########################################################
export type ProductDetailJSON = ProductBasePivot & {
    detalle:string,
    categorias:Array<number>,
    colores:Array<number>,
    imagen_2:string,
    imagen_3:string,
    imagen_4:string,
    imagen_5:string,
    dimensiones_mm:string,
};
export class ProductDetail extends ProductBase {
    constructor(
        public detail: string = "",
        public colors: Array<number> = [], 
        public categorys: Array<number> = [],
        public image_2:string = "",
        public image_3:string = "",
        public image_4:string = "",
        public image_5:string = "",
        public dimensions_mm:string = "",
        ...inheritedParams: ConstructorParameters<typeof ProductBase>
    ) {
        super(...inheritedParams);
    }
}
export function productDetailFromJSON(data: ProductDetailJSON): ProductDetail{
    return Object.assign(new ProductDetail(), data);
}

//  ########################################################
//  PRODUCT CART
//  ########################################################
export type ProductCardCartJSON = ProductBasePivot & {
    detalle:string,
    dimensiones_mm:string,
};

export class ProductCart extends ProductBase {
    constructor(
        public detail: string = "",
        public dimensions_mm:string = "",
        ...inheritedParams: ConstructorParameters<typeof ProductBase>
    ) {
        super(...inheritedParams);
    }
}

export function productCartFromJSON(data: ProductCardCartJSON): ProductCart{
    return Object.assign(new ProductCart(), data);
}
