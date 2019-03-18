export default class AppHelper {
    static debug(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    static getMappedObjectFromArray<T=any>(array: T[], uniqueField: string) {
        let result: { [key: string]: T } = {};

        array.forEach((item) => {
            let key = (item as any)[uniqueField];
            if (key) {
                result[key] = item;
            }
        });

        return result;
    }
}
