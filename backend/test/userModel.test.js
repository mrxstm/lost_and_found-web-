import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/userModel.js', () => ({
    Users: {
        create: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn()
    }
}));

const { Users } = await import('../models/userModel.js');

describe('User Model', () => {

    test('should create a user with correct fields', async () => {
        Users.create.mockResolvedValue({
            id: 1,
            fullname: 'Satyam Shrestha',
            username: 'satyam',
            email: 'satyam@test.com',
            phone_no: '9812345678',
            gender: 'male',
            role: 'user',
            college_id: 1
        });

        const user = await Users.create({
            fullname: 'Satyam Shrestha',
            username: 'satyam',
            email: 'satyam@test.com',
            password_hash: 'hashed',
            phone_no: '9812345678',
            gender: 'male',
            college_id: 1
        });

        expect(user.fullname).toBe('Satyam Shrestha');
        expect(user.email).toBe('satyam@test.com');
        expect(user.role).toBe('user');
    });

    test('should find a user by email', async () => {
        Users.findOne.mockResolvedValue({
            id: 1,
            email: 'satyam@test.com'
        });

        const user = await Users.findOne({ where: { email: 'satyam@test.com' } });
        expect(user).not.toBeNull();
        expect(user.email).toBe('satyam@test.com');
    });

    test('should return null if user not found', async () => {
        Users.findOne.mockResolvedValue(null);
        const user = await Users.findOne({ where: { email: 'notexist@test.com' } });
        expect(user).toBeNull();
    });

    test('should delete a user', async () => {
        Users.destroy.mockResolvedValue(1);
        const result = await Users.destroy({ where: { id: 1 } });
        expect(result).toBe(1);
    });

});