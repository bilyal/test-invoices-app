import {ProductDto,
        ADD_PRODUCT, addProductAction,
        EDIT_PRODUCT, editProductAction,
        DELETE_PRODUCT, deleteProductAction,
        FETCH_PRODUCTS, fetchProductsAction } from '../types/productTypes';

export function addProduct(newProduct: ProductDto) : addProductAction{
    return {
        type: ADD_PRODUCT,
        payload: newProduct
    }
}

export function editProduct(productId: number, newProductData: ProductDto) : editProductAction{
    return {
        type: EDIT_PRODUCT,
        payload: {
            id: productId,
            product: newProductData
        }
    }
}

export function deleteProduct(productId: number) : deleteProductAction{
    return {
        type: DELETE_PRODUCT,
        payload: productId
    }
}

export function fetchProducts() : fetchProductsAction{
    return {
        type: FETCH_PRODUCTS
    }
}