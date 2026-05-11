import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { createUser, createUsers } from '../services/user'
// import { ok } from 'assert';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'John Doe',
        email: 'john.doe@example.com'
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(400).json({ error: 'Email already exists.' });
    }
    res.json(user)
})

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([
        { name: 'Manuella', email: 'manuella@example.com' },
        { name: 'Lavinia', email: 'lavinia@example.com' },
        { name: 'Denny', email: 'denny@example.com' },
        { name: 'Marilene', email: 'marilene@example.com' },
        { name: 'Charlie Brown', email: 'charlie.brown@example.com' }
    ])
    if (result) {
        res.status(201).json({ ok: true })
    } else {
        res.status(400).json({ error: 'Error creating users' })
    }
})
