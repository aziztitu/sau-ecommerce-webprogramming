import { VuexModule, Module, getModule, Action } from 'vuex-module-decorators';
import store from '..';
import { Api } from '@/services/api/Api';
import authModule from './authModule';

@Module({
    dynamic: true,
    name: 'dashboardModule',
    store: store,
})
class AppModule extends VuexModule {

}

export default getModule(AppModule);
