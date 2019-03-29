import { Api } from './Api';
import { ApiResponseData } from '@/tools/types/api';
import lodash from 'lodash';

export class ProductData {
    _id: string = '';
    name: string = '';
    price: number = 0;
    plu: string = '';
    imageFile: File | null = null;
    vendorId: string = '';
    description: string = '';
}

export default {
    async getAllProducts() {
        let res = await Api.instance.get<ApiResponseData>('products/all');
        return res.data;
    },

    async addNewProduct(productData: PartialOmit<ProductData, '_id'>) {
        let { imageFile } = productData;

        let formData = new FormData();

        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        let reqData = lodash.cloneDeep(productData);
        reqData = lodash.omit(reqData, '_id');

        formData.append('_default', JSON.stringify(reqData));

        let res = await Api.instance.put<ApiResponseData>('products/new', formData);
        return res.data;
    },

    async updateProduct(productId: string, productData: PartialOmit<ProductData, "_id">) {
        let { imageFile } = productData;

        let formData = new FormData();

        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        let reqData = lodash.cloneDeep(productData);
        reqData = lodash.omit(reqData, '_id');

        formData.append('_default', JSON.stringify(reqData));

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

    async getProductDetails(productId: string) {
        let res = await Api.instance.get<ApiResponseData>(`products/select/${productId}/details`);
        return res.data;
    },
};
