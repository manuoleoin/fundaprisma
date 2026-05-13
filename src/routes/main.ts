import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { createUser, createUsers, getAllUsers } from '../services/user'
// import { ok } from 'assert';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Wild Bill',
        email: 'wild.bill@example.com', 
        posts: {
            create: {
                title: 'Post 1 - Wild Bill',
                content: 'Content of Post 1 - Wild Bill'
            }
        }
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

mainRouter.get('/users', async (req, res) => {
    const users = await getAllUsers()
    if (users) {
        res.json({users})
    } else {
        res.status(500).json({ error: 'Error fetching users' })
    }
})