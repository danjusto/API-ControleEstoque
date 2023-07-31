import { dbConnection } from "../database";

export class UserRepository {
    async findByEmail(email: string) {
        const db = await dbConnection();
      
        const [ user ] = await db.promise().execute("SELECT * FROM users WHERE email = (?)", [email]);
    
        return user;
    }
  
    async insertUser({ name, email, password }: {name: string, email: string, password: string}) {
        const db = await dbConnection();
  
        await db.promise().execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
        
        const user = await this.findByEmail(email);

        return user;
    }
}