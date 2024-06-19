// src/services/formService.ts

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { FormEntry } from '../models/formModel';
import { resolve } from 'path';

const DB_FILE = resolve(__dirname, '../../db.json');

const readData = (): FormEntry[] => {
    if (existsSync(DB_FILE)) {
        const rawData = readFileSync(DB_FILE);
        return JSON.parse(rawData.toString());
    }
    return [];
};

const writeData = (data: FormEntry[]) => {
    writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

export const getAllForms = (): Promise<FormEntry[]> => {
    return Promise.resolve(readData());
};

export const getFormByIndex = (index: number): Promise<FormEntry | null> => {
    const data = readData();
    return Promise.resolve(data[index] || null);
};

export const createForm = (form: FormEntry): Promise<void> => {
    const data = readData();
    data.push(form);
    writeData(data);
    return Promise.resolve();
};

export const deleteForm = (index: number): Promise<boolean> => {
    const data = readData();
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        writeData(data);
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
};

export const updateForm = (index: number, form: FormEntry): Promise<boolean> => {
    const data = readData();
    if (index >= 0 && index < data.length) {
        data[index] = form;
        writeData(data);
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
};

export const searchFormsByEmail = (email: string): Promise<FormEntry[]> => {
    const data = readData();
    const results = data.filter(entry => entry.email === email);
    return Promise.resolve(results);
};
