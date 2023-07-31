import { dbConnection } from "../database";

export class ProductRepo {
    async findProductBySku(sku: string) {
        const db = await dbConnection();

        const [ product ]: Array<any> = await db.promise().execute("SELECT * FROM products WHERE sku = ?", [sku]);
        
        return product;
    }

    async findAllProducts() {
        const db = await dbConnection();

        const [ listaProdutos ]: Array<any> = await db.promise().execute("SELECT * FROM products");

        return listaProdutos;
    }

    async findProductById(id: number) {
        const db = await dbConnection();

        const [ product ]: Array<any> = await db.promise().execute("SELECT * FROM products WHERE id = ?", [id]);

        return product;
    }

    async deleteById(id: number) {
        const db = await dbConnection();

        await db.promise().execute("DELETE FROM products WHERE id = ?", [id]);

        return;
    }

    async insertProduct(nome: string, quantidade: number, estoque_max: number, sku: string) {
        const db = await dbConnection();

        await db.promise().execute("INSERT INTO products (sku, name, quantidade, estoque_max) VALUES (?, ?, ?, ?)", [sku, nome, quantidade, estoque_max]);
        
        const product = await this.findProductBySku(sku);

        return product;
    }

    async updateProduct(nome: string, quantidade: number, estoque_max: number, id: number) {
        const db = await dbConnection();
        
        await db.promise().execute(`UPDATE products SET
        name = ?,
        quantidade = ?,
        estoque_max = ?
        WHERE id = ?`,
        [nome, quantidade, estoque_max, id]);

        const product = await this.findProductById(id);

        return product;
    }

    async updateQuantity(quantidade: number, id: number) {
        const db = await dbConnection();

        await db.promise().execute(`UPDATE products SET
        quantidade = ?
        WHERE id = ?`,
        [quantidade, id]);

        const product = await this.findProductById(id);

        return product;
    }
}