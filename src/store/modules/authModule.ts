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
import { ApiResponseData, AccountData, AccountRole } from '@/tools/types/api';
import AppHelper from '../../tools/AppHelper';
import lodash from 'lodash';
import cartModule from './cartModule';

@Module({
    dynamic: true,
    name: 'auth',
    store: store,
})
class AuthModule extends VuexModule {
    accountData: AccountData | null = null;

    get defaultAccountData(): AccountData {
        return {
            id: '',
            username: '',
            name: '',
            role: AccountRole.User,
        };
    }

    @MutationAction({ mutate: ['accountData'] })
    async setAccountData(accountData: AccountData | null) {
        return { accountData };
    }

    @Action
    assignDummyAccount() {
        this.setAccountData(this.defaultAccountData);
    }

    @Action
    async refreshAccountData() {
        const authRes = await Api.instance.get<ApiResponseData>(`accounts/me/authData`);

        AppHelper.debug({ authRes });

        if (authRes.data.success) {
            let { accountInfo } = authRes.data.authData;
            await this.setAccountData(accountInfo);
        }
    }

    @Action
    async clearAccountData() {
        await this.setAccountData(null);
    }

    @Action
    async validateApiToken() {
        const res = await Api.instance.post<ApiResponseData>('auth/validateApiToken');
        return res;
    }

    @Action
    async login(
        { username, password }: { username: string; password: string },
        autoRefreshAccount = true
    ) {
        AppHelper.debug(username);
        AppHelper.debug(password);
        const res = await Api.instance.post<ApiResponseData>('auth/login', {
            username,
            password,
            storeApiTokenInSession: true,
        });

        AppHelper.debug(res);
        if (res.data.success && autoRefreshAccount) {
            await this.refreshAccountData();
            await cartModule.refreshCartData();
        }

        return res;
    }

    @Action
    async signup(signupData: {
        name: string;
        username: string;
        password: string;
        email: string;
        recaptchaResponse: any;
    }) {
        AppHelper.debug(signupData);

        const res = await Api.instance.post<ApiResponseData>('auth/signup', signupData);

        AppHelper.debug(res);
        /* if (res.data.success) {
        } */

        return res;
    }

    @Action
    async logoutSession() {
        const res = await Api.instance.post<ApiResponseData>('auth/logoutSession');
        if (res.data.success) {
            await this.clearAccountData();
            await cartModule.refreshCartData();
        }

        return res;
    }
}

export default getModule(AuthModule);
