export interface ProductInterface {
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
    thumbnail: string;
}

export interface CartInterface {
    id: string;
    total: number;
    discountedTotal: number;
    userId: string;
    totalProducts: number;
    totalQuantity: number;
    products: ProductInterface[];
}
