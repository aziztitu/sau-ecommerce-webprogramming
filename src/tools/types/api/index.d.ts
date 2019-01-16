export type ApiResponseData = {
    success: boolean;
    message: string;
    errorReport?: object;
} & { [key: string]: any };
