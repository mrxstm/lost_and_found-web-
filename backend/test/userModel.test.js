const SequelizeMock = require ("sequelize-mock");


const dbMock = new SequelizeMock();

const UserMock = dbMock.define("Users", {
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
});

describe('User Model', ()=> {
    it('should create a user', async()=> {
        const user = await UserMock.create({
            fullname: "Satyam Shrestha",
            username: "stmm_ss",
            email: "shresthasatyam65@gmail.com",
            password_hash: "Ok12345",
            phone_no: "9840874455",
            gender: "Male",
            profile_pic_url: "/uploads/img.png",
            collage_id: 1,
            role: "user"  
        })

        expect(user.fullname).toBe("Satyam Shrestha")
        expect(user.username).toBe("stmm_ss")
        expect(user.email).toBe("shresthasatyam65@gmail.com")
        expect(user.password_hash).toBe("Ok12345")
        expect(user.phone_no).toBe("9840874455")
        expect(user.gender).toBe("Male")
        expect(user.profile_pic_url).toBe("/uploads/img.png")
        expect(user.collage_id).toBe(1)
        expect(user.role).toBe("user")

    })
    // it('should require all fields', async() => {
    //     await expect(UserMock.create({}).rejects.toThrow());
    // });
});









