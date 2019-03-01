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
import { ApiResponseData } from '@/tools/types/api';

export enum AccountRole {
    Admin = 'admin',
    User = 'user',
}

export enum ReservedUsername {
    Empty = '',
    Admin = 'admin',
}

export type AccountData = {
    username: string;
} | null;

@Module({
    dynamic: true,
    name: 'auth',
    store: store,
})
class AuthModule extends VuexModule {
    accountData: AccountData = null;

    @MutationAction({ mutate: ['accountData'] })
    async setAccountData(accountData: AccountData) {
        return { accountData };
    }

    @Action
    assignDummyAccount() {
        this.setAccountData({
            username: 'dummy',
        });
    }

    @Action
    async refreshAuthData() {
        const res = await Api.instance.get(`accounts/me/authData`);
        console.log(res);
        if (res.data.success) {
            let { accountInfo } = res.data.authData;
            await this.setAccountData(accountInfo);
        }
    }

    @Action
    async clearAuthData() {
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
        console.log(username);
        console.log(password);
        const res = await Api.instance.post<ApiResponseData>('auth/login', {
            username,
            password,
            storeApiTokenInSession: true,
        });

        console.log(res);
        if (res.data.success && autoRefreshAccount) {
            await this.refreshAuthData();
        }

        return res;
    }

    @Action
    async logoutSession() {
        const res = await Api.instance.post<ApiResponseData>('auth/logoutSession');
        if (res.data.success) {
            await this.clearAuthData();
        }

        return res;
    }
}

export default getModule(AuthModule);
