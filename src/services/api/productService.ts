import { Api } from './Api';
import { ApiResponseData } from '@/tools/types/api';

export default {
    async getAllProducts() {
        let res = await Api.instance.get<ApiResponseData>('products/all');
        return res.data;
    },

    async addNewProduct(productData: any) {
        let res = await Api.instance.put<ApiResponseData>('products/new', productData);
        return res.data;
    },
};
