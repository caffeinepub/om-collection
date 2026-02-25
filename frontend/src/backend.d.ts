import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export enum Category {
    womensWear = "womensWear",
    mensWear = "mensWear",
    accessories = "accessories",
    kidsWear = "kidsWear",
    ethnicWear = "ethnicWear"
}
export interface backendInterface {
    addProduct(name: string, category: Category, price: bigint, imageUrl: string, description: string): Promise<bigint>;
    deleteProduct(id: bigint): Promise<void>;
    getProductById(id: bigint): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getProductsSortedByName(): Promise<Array<Product>>;
    getProductsSortedByPrice(): Promise<Array<Product>>;
    updateProduct(id: bigint, name: string, category: Category, price: bigint, imageUrl: string, description: string): Promise<void>;
}
