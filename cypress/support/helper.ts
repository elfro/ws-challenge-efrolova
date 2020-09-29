export function getNumberFromString(str: string, separator: string = '$'): number {
    return Number(str.substring(str.indexOf(separator) + 1));
}

export function getSubstringAfterSeparator(str: string, separator: string = ': '): string {
    return str.split(separator).pop() as string;
}