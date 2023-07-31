const { UserCreateService } = require("../src/services/userCreateService");
const { UserRepoInMemory } = require("../src/repositories/userRepoInMemory");
const { AppError } = require("../src/utils/AppError");

describe("UserCreateService", () => {
    let userRepo;
    let userService;

    beforeEach(() => {
        userRepo = new UserRepoInMemory();
        userService = new UserCreateService(userRepo);
    });

    it("user should be created", async () => {
        // given
        const data = {
            name: "Fulano",
            email: "fulano@email.com",
            password: "123456"
        };

        // when
        const [ userCreated ] = await userService.execute({ name: data.name, email: data.email, password: data.password });

        // then
        expect(userCreated).toHaveProperty("user_id");
        expect(userCreated).toHaveProperty("email", "fulano@email.com");
    });

    it("user should not be created with existed email", async () => {
        // given
        const data1 = {
            name: "Fulano",
            email: "fulano@email.com",
            password: "123456"
        };

        const data2 = {
            name: "Beltrano",
            email: "fulano@email.com",
            password: "456789"
        };

        const [ userCreated1 ] = await userService.execute({ name: data1.name, email: data1.email, password: data1.password });
        
        // when
        try {
            const [ userCreated2 ] = await userService.execute({ name: data2.name, email: data2.email, password: data2.password });
        } catch (error) {
            
            // then
            expect(error).toBeInstanceOf(AppError);
        }
    });
})
