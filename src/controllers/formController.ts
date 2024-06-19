// src/controllers/formController.ts

import { Request, Response } from 'express';
import { getAllForms, getFormByIndex, createForm, deleteForm, updateForm, searchFormsByEmail } from '../services/formService';

export const ping = (req: Request, res: Response) => {
    res.send(true);
};

export const submitForm = (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required');
    }

    const newEntry = { name, email, phone, github_link, stopwatch_time };
    createForm(newEntry)
        .then(() => res.status(201).send('Form submitted successfully'))
        .catch(error => res.status(500).send(error.message));
};

export const readForm = (req: Request, res: Response) => {
    const { index } = req.query;

    if (typeof index !== 'string' || isNaN(Number(index))) {
        return res.status(400).send('Index must be a number');
    }

    const idx = parseInt(index, 10);

    getFormByIndex(idx)
        .then(form => {
            if (form) {
                res.status(200).json(form);
            } else {
                res.status(404).send('Index out of range');
            }
        })
        .catch(error => res.status(500).send(error.message));
};

export const deleteFormEntry = (req: Request, res: Response) => {
    const { index } = req.query;

    if (typeof index !== 'string' || isNaN(Number(index))) {
        return res.status(400).send('Index must be a number');
    }

    const idx = parseInt(index, 10);

    deleteForm(idx)
        .then(success => {
            if (success) {
                res.status(200).send('Form deleted successfully');
            } else {
                res.status(404).send('Index out of range');
            }
        })
        .catch(error => res.status(500).send(error.message));
};

export const editFormEntry = (req: Request, res: Response) => {
    const { index } = req.query;
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required');
    }

    if (typeof index !== 'string' || isNaN(Number(index))) {
        return res.status(400).send('Index must be a number');
    }

    const idx = parseInt(index, 10);
    const updatedEntry = { name, email, phone, github_link, stopwatch_time };

    updateForm(idx, updatedEntry)
        .then(success => {
            if (success) {
                res.status(200).send('Form updated successfully');
            } else {
                res.status(404).send('Index out of range');
            }
        })
        .catch(error => res.status(500).send(error.message));
};

export const searchForms = (req: Request, res: Response) => {
    const { email } = req.query;

    if (typeof email !== 'string') {
        return res.status(400).send('Email must be a string');
    }

    searchFormsByEmail(email)
        .then(forms => {
            if (forms.length > 0) {
                res.status(200).json(forms);
            } else {
                res.status(404).send('No entries found for the provided email');
            }
        })
        .catch(error => res.status(500).send(error.message));
};
