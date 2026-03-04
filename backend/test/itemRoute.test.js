import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';

// Mock controllers
jest.unstable_mockModule('../controllers/itemController.js', () => ({
    getAllItem: jest.fn((req, res) => res.status(200).json({ data: [], message: 'Items fetched successfully' })),
    getItemById: jest.fn((req, res) => res.status(200).json({ data: {}, message: 'Items fetched successfully' })),
    getItemByStatus: jest.fn((req, res) => res.status(200).json({ data: [], message: 'Items fetched successfully' })),
    searchItems: jest.fn((req, res) => res.status(200).json({ data: [], message: 'Items fetched successfully' })),
    getRecentLostItems: jest.fn((req, res) => res.status(200).json({ data: [], message: 'Recent lost items fetched successfully' })),
    addItemReport: jest.fn((req, res) => res.status(201).json({ message: 'Item reported successfully' })),
    updateItem: jest.fn((req, res) => res.status(200).json({ message: 'Item updated successfully' })),
    deleteItem: jest.fn((req, res) => res.status(200).json({ message: 'Item deleted successfully' }))
}));

// Mock middleware
jest.unstable_mockModule('../middlewares/authMiddleware.js', () => ({
    isAuthenticated: jest.fn((req, res, next) => next())
}));

// Mock multer
jest.unstable_mockModule('../middlewares/multerConfig.js', () => ({
    uploadItemImages: {
        array: jest.fn(() => (req, res, next) => next())
    }
}));

const itemRoute = (await import('../routes/itemRoute.js')).default;

const app = express();
app.use(express.json());
app.use('/api/item', itemRoute);

describe('Item Routes', () => {

    test('GET /api/item/recent-lost-items should return 200', async () => {
        const res = await request(app).get('/api/item/recent-lost-items');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Recent lost items fetched successfully');
    });

    test('GET /api/item should return 200 with items', async () => {
        const res = await request(app).get('/api/item');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Items fetched successfully');
    });

    test('POST /api/item/add should return 201', async () => {
        const res = await request(app)
            .post('/api/item/add')
            .send({
                itemName: 'Laptop',
                category: 'Electronics',
                itemDescription: 'Silver laptop',
                status: 'lost',
                location_id: 1,
                date: '2024-01-01'
            });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Item reported successfully');
    });

    test('DELETE /api/item/:id should return 200', async () => {
        const res = await request(app).delete('/api/item/1');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Item deleted successfully');
    });

});