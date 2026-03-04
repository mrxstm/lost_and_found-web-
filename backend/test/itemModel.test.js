import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/itemModel.js', () => ({
    Item: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    }
}));

const { Item } = await import('../models/itemModel.js');

describe('Item Model', () => {

    test('should create an item with correct fields', async () => {
        Item.create.mockResolvedValue({
            id: 1,
            itemName: 'Laptop',
            category: 'Electronics',
            itemDescription: 'Silver laptop found near library',
            status: 'found',
            location_id: 1,
            reported_by: 1,
            college_id: 1,
            isApproved: false
        });

        const item = await Item.create({
            itemName: 'Laptop',
            category: 'Electronics',
            itemDescription: 'Silver laptop found near library',
            status: 'found',
            location_id: 1,
            reported_by: 1,
            college_id: 1
        });

        expect(item.itemName).toBe('Laptop');
        expect(item.status).toBe('found');
        expect(item.isApproved).toBe(false);
    });

    test('should find all items', async () => {
        Item.findAll.mockResolvedValue([
            { id: 1, itemName: 'Wallet', status: 'lost' },
            { id: 2, itemName: 'Phone', status: 'found' }
        ]);

        const items = await Item.findAll();
        expect(items.length).toBe(2);
        expect(items[0].itemName).toBe('Wallet');
    });

    test('should return null if item not found', async () => {
        Item.findOne.mockResolvedValue(null);
        const item = await Item.findOne({ where: { id: 999 } });
        expect(item).toBeNull();
    });

    test('should delete an item', async () => {
        Item.destroy.mockResolvedValue(1);
        const result = await Item.destroy({ where: { id: 1 } });
        expect(result).toBe(1);
    });

});