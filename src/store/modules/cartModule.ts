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
import authModule from './authModule';

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
    async getItemCount(productId: string) {
        let count = 0;
        this.cartData.cartItems.forEach((cartItem) => {
            if (cartItem.product == productId) {
                count = cartItem.count;
            }
        });

        return count;
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

        const res = await Api.instance.post<ApiResponseData>(`cart/updateCartItem`, reqData);

        if (res.data.success) {
            await this.refreshCartData();
        }

        return res;
    }

    @Action
    async removeFromCart({ productId, count }: { productId: string; count: number }) {
        return await this.addToCart({
            productId,
            count: -count,
        });
    }

    @Action
    async eraseFromCart(productId: string) {
        const reqData = {
            productId: productId,
        };
        console.log(reqData);

        const res = await Api.instance.post<ApiResponseData>(`cart/eraseCartItem`, reqData);

        if (res.data.success) {
            await this.refreshCartData();
        }

        return res;
    }

    @Action
    async placeOrderFromCart(orderData: NewOrderData) {
        if (!authModule.accountData) {
            return {
                success: false,
                message: 'Please log in first',
            } as ApiResponseData;
        }

        const res = await Api.instance.put<ApiResponseData>(`cart/placeOrder`, orderData);

        if (res.data.success) {
            await this.refreshCartData();
        }

        return res.data;
    }
}

export type NewOrderData = {
    orderType: 0 | 1;

    pickupDate: string;
    pickupTime: string;

    deliveryStreet: string;
    deliveryCity: string;
    deliveryState: string;
    deliveryZip: string;

    billingCardNum: string;
    billingCVV: string;
    billingStreet: string;
    billingCity: string;
    billingState: string;
    billingZip: string;
};

export default getModule(CartModule);
