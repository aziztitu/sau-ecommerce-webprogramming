export default class AppHelper {
    static debug(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }
}
