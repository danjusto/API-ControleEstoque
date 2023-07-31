const { UserCreateService } = require("../src/services/userCreateService");
const { UserRepoInMemory } = require("../src/repositories/userRepoInMemory");
const { SessionCreateService } = require("../src/services/sessionsCreateService");
const { AppError } = require("../src/utils/AppError");

describe("UserCreateService", () => {
    let userRepo;
    let userService;
    let sessionService;

    beforeEach(() => {
        userRepo = new UserRepoInMemory();
        userService = new UserCreateService(userRepo);
        sessionService = new SessionCreateService(userRepo);
    });

    it("session should be created", async () => {
        // given
        const data = {
            name: "Fulano",
            email: "fulano@email.com",
            password: "123456"
        };

        await userService.execute({ name: data.name, email: data.email, password: data.password });

        const session = {
            email: "fulano@email.com",
            password: "123456"
        };
        
        // when
        const sessionCreated = await sessionService.execute(session);

        // then
        expect(sessionCreated).toHaveProperty("token");
    });

    it("invalid email", async () => {
        // given
        const data = {
            name: "Fulano",
            email: "fulano@email.com",
            password: "123456"
        };

        await userService.execute({ name: data.name, email: data.email, password: data.password });

        const session = {
            email: "outro@email.com",
            password: "123456"
        };
        
        // when
        try {
            await sessionService.execute(session);
        } catch (error) {
            
            // then
            expect(error).toBeInstanceOf(AppError);
        }
    });

    it("invalid password", async () => {
        // given
        const data = {
            name: "Fulano",
            email: "fulano@email.com",
            password: "123456"
        };

        await userService.execute({ name: data.name, email: data.email, password: data.password });

        const session = {
            email: "fulano@email.com",
            password: "456789"
        };
        
        // when
        try {
            await sessionService.execute(session);
        } catch (error) {
            
            // then
            expect(error).toBeInstanceOf(AppError);
        }
    });
})
