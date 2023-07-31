export class UserRepoInMemory {
    users: Array<any> = [];
    current_id = 1;

    async findByEmail(email: string) {
        const user = this.users.find((user: any) => user.email === email);
        if (!user) {
            return [];
        }

        return [user];
    }
  
    async insertUser({ name, email, password }: {name: string, email: string, password: string}) {
        const user = {
            user_id: this.current_id,
            name,
            email,
            password
        }
        
        this.users.push(user);
        this.current_id++;

        return [user];
    }
}