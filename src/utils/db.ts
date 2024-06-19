// src/utils/db.ts

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const DB_FILE = resolve(__dirname, '../../db.json');

export const readData = <T>(): T[] => {
    if (existsSync(DB_FILE)) {
        const rawData = readFileSync(DB_FILE);
        return JSON.parse(rawData.toString());
    }
    return [];
};

export const writeData = <T>(data: T[]) => {
    writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};
