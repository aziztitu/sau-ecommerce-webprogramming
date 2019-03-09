export type ApiResponseData = {
    success: boolean;
    message: string;
    errorReport?: any;
} & { [key: string]: any };
