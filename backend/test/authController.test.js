import { jest } from '@jest/globals';

// Mock dependencies
jest.unstable_mockModule('../models/association.js', () => ({
    Users: {
        findOne: jest.fn(),
        create: jest.fn()
    }
}));

jest.unstable_mockModule('../models/collegeModel.js', () => ({
    College: {
        findOne: jest.fn()
    }
}));

jest.unstable_mockModule('../utils/mailer.js', () => ({
    sendResetEmail: jest.fn()
}));

jest.unstable_mockModule('../utils/hashPassword.js', () => ({
    hashPassword: jest.fn().mockResolvedValue('hashed_password')
}));

jest.unstable_mockModule('bcrypt', () => ({
    default: {
        compare: jest.fn()
    }
}));

jest.unstable_mockModule('../utils/jwt-utils.js', () => ({
    generateToken: jest.fn().mockReturnValue('mock_token')
}));

const { register, login, forgotPassword, resetPassword } = 
    await import('../controllers/authController.js');
const { Users } = await import('../models/association.js');
const { College } = await import('../models/collegeModel.js');
const bcrypt = (await import('bcrypt')).default;

// helper to mock req/res
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
};

// ─────────────────────────────────────────
// REGISTER TESTS
// ─────────────────────────────────────────
describe('Auth Controller - Register', () => {

    test('should return 400 if fullname is missing', async () => {
        const req = { body: { fullname: '', username: 'test', email: 'test@test.com', password: 'Test@1234', phone_no: '9812345678', gender: 'male', college: 'Softwarica' } };
        const res = mockRes();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Fullname is required' });
    });

    test('should return 400 if email is already registered', async () => {
        Users.findOne.mockResolvedValueOnce({ id: 1, email: 'test@test.com' });
        College.findOne.mockResolvedValueOnce({ id: 1, name: 'Softwarica' });
        const req = { body: { fullname: 'Test User', username: 'testuser', email: 'test@test.com', password: 'Test@1234', phone_no: '9812345678', gender: 'male', college: 'Softwarica' } };
        const res = mockRes();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email already registered' });
    });

    test('should return 400 if password is weak', async () => {
        const req = { body: { fullname: 'Test User', username: 'testuser', email: 'test@test.com', password: 'weakpass', phone_no: '9812345678', gender: 'male', college: 'Softwarica' } };
        const res = mockRes();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should return 201 on successful registration', async () => {
        Users.findOne.mockResolvedValue(null);
        College.findOne.mockResolvedValue({ id: 1, name: 'Softwarica' });
        Users.create.mockResolvedValue({ id: 1, email: 'new@test.com' });
        const req = { body: { fullname: 'New User', username: 'newuser', email: 'new@test.com', password: 'Test@1234', phone_no: '9812345678', gender: 'male', college: 'Softwarica' } };
        const res = mockRes();
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User registration successful' });
    });

});

// ─────────────────────────────────────────
// LOGIN TESTS
// ─────────────────────────────────────────
describe('Auth Controller - Login', () => {

    test('should return 400 if email is missing', async () => {
        const req = { body: { email: '', password: 'Test@1234' } };
        const res = mockRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email is required' });
    });

    test('should return 404 if user not found', async () => {
        Users.findOne.mockResolvedValue(null);
        const req = { body: { email: 'notfound@test.com', password: 'Test@1234' } };
        const res = mockRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should return 400 if password is incorrect', async () => {
        Users.findOne.mockResolvedValue({ id: 1, email: 'test@test.com', password_hash: 'hashed' });
        bcrypt.compare.mockResolvedValue(false);
        const req = { body: { email: 'test@test.com', password: 'WrongPass@1' } };
        const res = mockRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Password is incorrect' });
    });

    test('should return 200 and set cookie on successful login', async () => {
        Users.findOne.mockResolvedValue({ id: 1, email: 'test@test.com', password_hash: 'hashed', role: 'user', college_id: 1, fullname: 'Test' });
        bcrypt.compare.mockResolvedValue(true);
        const req = { body: { email: 'test@test.com', password: 'Test@1234' } };
        const res = mockRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.cookie).toHaveBeenCalledWith('access_token', 'mock_token', expect.any(Object));
    });

});

// ─────────────────────────────────────────
// FORGOT PASSWORD TESTS
// ─────────────────────────────────────────
describe('Auth Controller - Forgot Password', () => {

    test('should return 400 if email is missing', async () => {
        const req = { body: { email: '' } };
        const res = mockRes();
        await forgotPassword(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email is required' });
    });

    test('should return 200 even if user not found (security)', async () => {
        Users.findOne.mockResolvedValue(null);
        const req = { body: { email: 'nouser@test.com' } };
        const res = mockRes();
        await forgotPassword(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

});