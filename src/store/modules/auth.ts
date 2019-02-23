import { VuexModule, Module } from 'vuex-module-decorators';

@Module
export default class AuthModule extends VuexModule {
    accountData = {};
}
