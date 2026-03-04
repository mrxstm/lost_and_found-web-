import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';

// Mock controllers
jest.unstable_mockModule('../controllers/authController.js', () => ({
    register: jest.fn((req, res) => res.status(201).json({ message: 'User registration successful' })),
    login: jest.fn((req, res) => res.status(200).json({ message: 'Login successful' })),
    logout: jest.fn((req, res) => res.status(200).json({ message: 'Logged out successfully' })),
    forgotPassword: jest.fn((req, res) => res.status(200).json({ message: 'If this email exists, a reset link has been sent' })),
    resetPassword: jest.fn((req, res) => res.status(200).json({ message: 'Password reset successful' }))
}));

// Mock middleware
jest.unstable_mockModule('../middlewares/authMiddleware.js', () => ({
    isAuthenticated: jest.fn((req, res, next) => next())
}));

const authRoute = (await import('../routes/authRoute.js')).default;

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);

describe('Auth Routes', () => {

    test('POST /api/auth/register should return 201', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                fullname: 'Test User',
                username: 'testuser',
                email: 'test@test.com',
                password: 'Test@1234',
                phone_no: '9812345678',
                gender: 'male',
                college: 'Softwarica'
            });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User registration successful');
    });

    test('POST /api/auth/login should return 200', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@test.com', password: 'Test@1234' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Login successful');
    });

    test('POST /api/auth/logout should return 200', async () => {
        const res = await request(app).post('/api/auth/logout');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Logged out successfully');
    });

    test('POST /api/auth/forgot-password should return 200', async () => {
        const res = await request(app)
            .post('/api/auth/forgot-password')
            .send({ email: 'test@test.com' });
        expect(res.status).toBe(200);
    });

});