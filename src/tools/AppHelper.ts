import { defaultTheme } from '@/AppConfig';
import lodash from 'lodash';

export default class AppHelper {
    static debug(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    static getMappedObjectFromArray<T = any>(array: T[], uniqueField: string) {
        let result: { [key: string]: T } = {};

        array.forEach((item) => {
            let key = (item as any)[uniqueField];
            if (key) {
                result[key] = item;
            }
        });

        return result;
    }

    static getCSSSize(value: string | number) {
        if (typeof value === 'number') {
            value = `${value}px`;
        }

        return value;
    }

    static getFixedSizeStyle(width: string | number, height: string | number) {
        width = AppHelper.getCSSSize(width);
        height = AppHelper.getCSSSize(height);

        return `min-width:${width};min-height:${height};width:${width};height:${height};max-width:${width};max-height:${height};`;
    }

    static getAppColor(color: string) {
        // if (Object.keys(defaultTheme).includes(color)) {
        if (lodash.has(defaultTheme, color)) {
            //@ts-ignore
            return defaultTheme[color];
        }

        return color;
    }

    static lightOrDark(color: any) {
        // Variables for red, green, blue values
        var r, g, b, hsp;

        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {
            // If HEX --> store the red, green, blue values in separate variables
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

            r = color[1];
            g = color[2];
            b = color[3];
        } else {
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

            r = color >> 16;
            g = (color >> 8) & 255;
            b = color & 255;
        }

        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

        // Using the HSP value, determine whether the color is light or dark
        if (hsp > 127.5) {
            return 'light';
        } else {
            return 'dark';
        }
    }

    static isColorLight(color: string) {
        return AppHelper.lightOrDark(color) === 'light';
    }

    static isColorDark(color: string) {
        return AppHelper.lightOrDark(color) === 'dark';
    }

    static formatCurrency(value: number) {
        return value.toFixed(2);
    }
}
