const checkIsProduction = (): boolean => !!import.meta.env.MODE && import.meta.env.MODE === 'production';
export const isProduction: boolean = checkIsProduction();
