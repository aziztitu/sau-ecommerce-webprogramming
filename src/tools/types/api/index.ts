export type ApiResponseData = {
    success: boolean;
    message: string;
    errorReport?: any;
} & { [key: string]: any };

export enum AccountRole {
    Admin = 'admin',
    User = 'user',
}

export enum ReservedUsername {
    Empty = '',
    Admin = 'admin',
}

export class CartItem {
    product!: string;
    count: number = 0;
}

export class CartData {
    cartItems: CartItem[] = [];
}

export type AccountData = {
    id: string;
    username: string;
    name: string;
    role: AccountRole;
};

export class ProductData {
    _id: string = '';
    name: string = '';
    price: number = 0;
    plu: string = '';
    imageFile: File | null = null;
    vendorId: string = '';
    description: string = '';
    detailHTML: string = '';
}
