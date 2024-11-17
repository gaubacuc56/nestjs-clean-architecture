export function parseFilter(str: string | undefined) {
    if (str) return JSON.parse(str);
    return;
}
