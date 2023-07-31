import { dbConnection }  from "../index";
import { createProducts } from "./createProducts";
import { createUsers } from "./createUsers";

export async function migrationsRun() {
    const db = await dbConnection();

    db.promise().execute(createProducts);
    db.promise().execute(createUsers);
}