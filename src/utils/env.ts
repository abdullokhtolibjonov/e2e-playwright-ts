import dotenv from 'dotenv';

dotenv.config();

export function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}

export const ENV = {
    BASE_URL: getEnv('BASE_URL'),
    STANDARD_USER: getEnv('STANDARD_USER'),
    LOCKED_OUT_USER: getEnv('LOCKED_OUT_USER'),
    PROBLEM_USER: getEnv('PROBLEM_USER'),
    PERFORMANCE_GLITCH_USER: getEnv('PERFORMANCE_GLITCH_USER'),
    PASSWORD: getEnv('PASSWORD'),
}