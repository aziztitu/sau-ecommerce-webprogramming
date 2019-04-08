import {
    VuexModule,
    Module,
    getModule,
    Action,
    Mutation,
    MutationAction,
} from 'vuex-module-decorators';
import store from '..';
import { Api } from '@/services/api/Api';
import { ApiResponseData, AccountData, AccountRole, CartData } from '@/tools/types/api';
import AppHelper from '../../tools/AppHelper';
import lodash from 'lodash';

@Module({
    dynamic: true,
    name: 'cart',
    store: store,
})
class CartModule extends VuexModule {
    cartData: CartData = new CartData();

    @MutationAction({ mutate: ['cartData'] })
    async setCartData(cartData: CartData) {
        return { cartData };
    }

    @Action
    async refreshCartData() {
        const cartRes = await Api.instance.get<ApiResponseData>(`cart/data`);

        AppHelper.debug({ cartRes });

        if (cartRes.data.success) {
            let { cartData } = cartRes.data;
            await this.setCartData(cartData);
        }
    }

    @Action
    async clearCartData() {
        await this.setCartData(new CartData());
    }

    @Action
    async addToCart({ productId, count }: { productId: string; count: number }) {
        console.log(count);

        const reqData = {
            productId: productId,
            count: count,
        };
        console.log(reqData);

        const res = await Api.instance.post<ApiResponseData>(`cart/addItem`, reqData);

        if (res.data.success) {
            this.refreshCartData();
        }

        return res;
    }
}

export default getModule(CartModule);
