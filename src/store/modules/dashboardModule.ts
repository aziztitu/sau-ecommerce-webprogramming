import { VuexModule, Module, getModule, Action } from 'vuex-module-decorators';
import store from '..';

@Module({
    dynamic: true,
    name: 'dashboard',
    store: store,
})
class DashboardModule extends VuexModule {
    @Action
    refreshDashboardData() {
      
    }
}

export default getModule(DashboardModule);
