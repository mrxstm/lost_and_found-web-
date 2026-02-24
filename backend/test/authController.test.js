import authController from '../controllers/authController.js';
import {Users} from '../models/userModel.js';


// mock sequelize methods
jest.mock('../models/userModel.js', ()=> ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPK: jest.fn(),
    upadate: jest.fn(),
    destroy: jest.fn(),
}));

describe('User Controller', ()=> {
    const mockResponse = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
})

it('should create a new user', async() => {
    const req = { body : {  
        id: 1,
        fullname: "Satyam Shrestha",
        username: "stmm_ss",
        email: "shresthasatyam65@gmail.com",
        password_hash: "Ok12345",
        phone_no: "9840874455",
        gender: "Male",
        profile_pic_url: "/uploads/img.png",
        collage_id: 1,
        role: "user"   
    }};

    const res = mockResponse();
    Users.create.mockResponseValue(req.body);

    await authController.save

})