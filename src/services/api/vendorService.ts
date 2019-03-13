import { Api } from './Api';
import { ApiResponseData } from '@/tools/types/api';

export default {
    async getAllVendors() {
        let res = await Api.instance.get<ApiResponseData>('vendors/all');
        return res.data;
    },

    async addNewVendor(vendorData: any) {
        let res = await Api.instance.put<ApiResponseData>('vendors/new', vendorData);
        return res.data;
    },
};
