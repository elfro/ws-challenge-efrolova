export function getPriceFromString(str: string, separator: string = '$'): number {
    return Number(str.substring(str.indexOf(separator) + 1));
}
