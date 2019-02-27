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

export type AccountData = {
    username: string;
} | null;

@Module({
    dynamic: true,
    store: store,
    name: 'auth',
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
    async validateApiToken() {
        const res = await Api.instance.post<ApiResponseData>('auth/validateApiToken');
        return res;
    }

    @Action
    async login({ username, password }: { username: string; password: string }) {
        console.log(username);
        console.log(password);
        const res = await Api.instance.post<ApiResponseData>('auth/login', {
            username,
            password,
            storeApiTokenInSession: true,
        });

        console.log(res);
        if (res.data.success) {
            this.setAccountData({
                username,
            });
        }

        return res;
    }

    @Action
    async logoutSession() {
        const res = await Api.instance.post<ApiResponseData>('auth/logoutSession');

        if (res.data.success) {
            this.setAccountData(null);
        }

        return res;
    }
}

export default getModule(AuthModule);
