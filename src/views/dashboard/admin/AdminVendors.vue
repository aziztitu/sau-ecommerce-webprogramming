<template>
    <v-layout column class="max-height">
        <v-flex>
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar color="primary" dark class="flat">
                        <v-toolbar-title>Vendors</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                icon
                                outline
                                dark
                                @click="refreshVendors"
                                :loading="isLoadingVendors"
                            >
                                <v-icon>refresh</v-icon>
                            </v-btn>
                            <v-btn icon outline dark @click="vendorAddDialogModel = true">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-card-text class="pa-0">
                    <v-layout row>
                        <v-flex xs12>
                            <v-data-table
                                :headers="vendorTableHeaders"
                                :items="vendors"
                                class="elevation-1"
                                :loading="isLoadingVendors"
                            >
                                <template slot="no-data">No Vendors Found</template>
                                <template slot="items" slot-scope="props">
                                    <td v-if="props" class="text-xs-left">{{ props.item.name }}</td>
                                    <td v-if="props" class="text-xs-left">{{ props.item.email }}</td>
                                    <td v-if="props" class="text-xs-left">{{ props.item.phone }}</td>
                                    <td v-if="props" class="text-xs-left">{{ props.item.address }}</td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-dialog v-model="vendorAddDialogModel" max-width="420">
            <v-card>
                <v-card-title>
                    <span class="headline pt-3 pl-3">Add New Vendor</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        v-model="newVendorData.name"
                                        label="Vendor Name*"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="newVendorData.email" label="Email"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="newVendorData.phone" label="Phone"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="newVendorData.address" label="Address"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="vendorAddDialogModel = false">Close</v-btn>
                    <v-btn flat @click="addNewVendor" :loading="isAddingVendor">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import vendorService from '@/services/api/vendorService';
    import { DataTableHeader } from '@/tools/types/vuetify/additionalTypeDeclarations';
    import SnackBar from '@/components/singleton/SnackBar.vue';
    import dashboardModule, { VendorData } from '@/store/modules/dashboardModule';

    @Component({
        components: {
            Placeholder
        }
    })
    export default class AdminVendors extends Vue {

        vendorTableHeaders: DataTableHeader[] = [
            {
                text: 'Name',
                align: 'left',
                value: 'name',
            },
            {
                text: 'Email',
                align: 'left',
                value: 'email',
            },
            {
                text: 'Phone',
                align: 'left',
                value: 'phone',
            },
            {
                text: 'Address',
                align: 'left',
                value: 'address',
            }
        ];

        get vendors() {
            return dashboardModule.vendors;
        }

        vendorAddDialogModel = false;

        newVendorData: VendorData = new VendorData();

        isLoadingVendors = false;
        isAddingVendor = false;

        mounted() {
            // this.refreshVendors();
        }

        async refreshVendors() {
            this.isLoadingVendors = true;
            let resData = await dashboardModule.refreshVendors();
            this.isLoadingVendors = false;
        }

        async addNewVendor() {
            this.isAddingVendor = true;

            let resData = await vendorService.addNewVendor(this.newVendorData);
            this.isAddingVendor = false;

            if (resData.success) {
                this.newVendorData = new VendorData();
                SnackBar.show('Vendor added successfully');

                // this.vendorAddDialogModel = false;
                this.refreshVendors();
            } else {
                SnackBar.show(`Error: ${resData.message}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
