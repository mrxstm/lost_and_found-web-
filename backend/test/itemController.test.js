import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/association.js', () => ({
    Item: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        count: jest.fn()
    },
    Location: {},
    Users: {},
    College: {}
}));

const { getAllItem, addItemReport, getItemByStatus } = 
    await import('../controllers/itemController.js');
const { Item } = await import('../models/association.js');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

// ─────────────────────────────────────────
// GET ALL ITEMS TESTS
// ─────────────────────────────────────────
describe('Item Controller - Get All Items', () => {

    test('should return 200 with items', async () => {
        Item.findAll.mockResolvedValue([{ id: 1, itemName: 'Wallet' }]);
        const req = { user: { id: 1, college_id: 1 } };
        const res = mockRes();
        await getAllItem(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should return 500 on database error', async () => {
        Item.findAll.mockRejectedValue(new Error('DB error'));
        const req = { user: { id: 1, college_id: 1 } };
        const res = mockRes();
        await getAllItem(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });

});

// ─────────────────────────────────────────
// ADD ITEM REPORT TESTS
// ─────────────────────────────────────────
describe('Item Controller - Add Item Report', () => {

    test('should return 400 if itemName is missing', async () => {
        const req = { body: { itemName: '', category: 'Electronics', itemDescription: 'test', status: 'lost', date: '2024-01-01' }, user: { id: 1, college_id: 1 }, files: [] };
        const res = mockRes();
        await addItemReport(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Item name is required' });
    });

    test('should return 201 on successful item report', async () => {
        Item.create.mockResolvedValue({ id: 1, itemName: 'Laptop' });
        const req = { body: { itemName: 'Laptop', category: 'Electronics', itemDescription: 'Silver laptop', status: 'lost', location_id: 1, date: '2024-01-01' }, user: { id: 1, college_id: 1 }, files: [] };
        const res = mockRes();
        await addItemReport(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });

});

// ─────────────────────────────────────────
// GET ITEM BY STATUS TESTS
// ─────────────────────────────────────────
describe('Item Controller - Get Item By Status', () => {

    test('should return 400 for invalid status', async () => {
        const req = { params: { status: 'invalid' }, user: { id: 1 } };
        const res = mockRes();
        await getItemByStatus(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid status' });
    });

    test('should return 200 for valid status', async () => {
        Item.findAll.mockResolvedValue([{ id: 1, status: 'lost' }]);
        const req = { params: { status: 'lost' }, user: { id: 1 } };
        const res = mockRes();
        await getItemByStatus(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

});