import { Api } from './Api';
import { ApiResponseData } from '@/tools/types/api';

export default {
    async getAllProducts() {
        let res = await Api.instance.get<ApiResponseData>('products/all');
        return res.data;
    },

    async addNewProduct(productData: {
        name: string;
        price: number;
        plu: string;
        vendorId: string;
        imageFile?: File | null;
    }) {
        let { name, price, plu, vendorId, imageFile } = productData;

        let formData = new FormData();

        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        formData.append(
            '_default',
            JSON.stringify({
                name,
                price,
                plu,
                vendorId,
            })
        );

        let res = await Api.instance.put<ApiResponseData>('products/new', formData);
        return res.data;
    },

    async updateProduct(
        productId: string,
        productData: {
            name: string;
            price: number;
            plu: string;
            vendorId: string;
            imageFile?: File | null;
        }
    ) {
        let { name, price, plu, vendorId, imageFile } = productData;

        let formData = new FormData();

        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        formData.append(
            '_default',
            JSON.stringify({
                name,
                price,
                plu,
                vendorId,
            })
        );

        let res = await Api.instance.post<ApiResponseData>(
            `products/select/${productId}/update`,
            formData
        );
        return res.data;
    },

    async removeProduct(productId: string) {
        let res = await Api.instance.post<ApiResponseData>(`products/select/${productId}/remove`);
        return res.data;
    },
};
