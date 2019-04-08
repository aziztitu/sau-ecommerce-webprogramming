import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '..';
import vendorService from '@/services/api/vendorService';
import AppHelper from '@/tools/AppHelper';
import cartModule from './cartModule';

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

    mapped = {
        vendors: {} as { [key: string]: VendorData },
    };

    @Mutation
    setVendors(vendors: VendorData[]) {
        this.vendors = vendors;
        this.mapped.vendors = AppHelper.getMappedObjectFromArray(this.vendors, '_id');
    }

    @Action
    refreshDashboardData() {
        this.refreshVendors();
        cartModule.refreshCartData();
    }

    @Action
    async refreshVendors() {
        let resData = await vendorService.getAllVendors();
        if (resData.success) {
            this.context.commit('setVendors', resData.vendors);
        }

        return resData;
    }
}

export default getModule(DashboardModule);
