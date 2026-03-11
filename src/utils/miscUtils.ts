const checkIsProduction = (): boolean => !!import.meta.env.MODE && import.meta.env.MODE === 'production';
export const isProduction: boolean = checkIsProduction();

export function isEmptyOrSpaces(str: string): boolean {
  return str === null || str.toString().match(/^ *$/) !== null;
}
