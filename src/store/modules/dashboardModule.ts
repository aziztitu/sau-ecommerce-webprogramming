import {
    VuexModule,
    Module,
    getModule,
    Action,
    Mutation,
    MutationAction,
} from 'vuex-module-decorators';
import store from '..';
import vendorService from '@/services/api/vendorService';
import AppHelper from '@/tools/AppHelper';
import cartModule from './cartModule';
import { Api } from '@/services/api/Api';
import { ApiResponseData } from '@/tools/types/api';

export class VendorData {
    _id?: string;
    name: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';
}
@Module({
    dynamic: true,
    name: 'dashboard',
    store: store,
})
class DashboardModule extends VuexModule {
    vendors: VendorData[] = [];

    tax: number = 0;
    deliveryCharge: number = 0;

    mapped = {
        vendors: {} as { [key: string]: VendorData },
    };

    @Mutation
    setVendors(vendors: VendorData[]) {
        this.vendors = vendors;
        this.mapped.vendors = AppHelper.getMappedObjectFromArray(this.vendors, '_id');
    }

    @MutationAction({ mutate: ['tax', 'deliveryCharge'] })
    async refreshDashboardData() {
        // console.log(this);

        dashboardModule.refreshVendors();
        cartModule.refreshCartData();

        let res = await Api.instance.get<ApiResponseData>('dashboardData');
        if (res.data.success) {
            return res.data.dashboardData;
        }
    }

    @Action
    async refreshVendors() {
        // console.log(this);

        let resData = await vendorService.getAllVendors();
        if (resData.success) {
            this.context.commit('setVendors', resData.vendors);
        }

        return resData;
    }
}

const dashboardModule = getModule(DashboardModule);
export default dashboardModule;