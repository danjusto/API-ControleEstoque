const { ProductsService } = require("../src/services/productsService");
const { ProductRepoInMemory } = require("../src/repositories/productRepoInMemory");
const { AppError } = require("../src/utils/AppError");

describe("ProductCreateService", () => {
    let productRepo;
    let productsService;

    beforeEach(() => {
        productRepo = new ProductRepoInMemory();
        productsService = new ProductsService(productRepo);
    });

    it("product should be created", async () => {
        // given
        const data = {
            sku: "TST0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };

        // when
        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // then
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("sku", "TST0000");
    })

    it("error should be throwed on create product2 because same sku", async () => {
        // given
        const data1 = {
            sku: "TST0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };

        const data2 = {
            sku: "TST0000",
            name: "Produto nº 2",
            quantidade: 100,
            estoque_max: 200
        };

        // when

        const [ product1 ] = await productsService.executeCreate({sku: data1.sku, nome: data1.name, quantidade: data1.quantidade, estoque_max: data1.estoque_max});

        try {
            const [ product2 ] = await productsService.executeCreate({sku: data2.sku, nome: data2.name, quantidade: data2.quantidade, estoque_max: data2.estoque_max});
        } catch (error) {

            // then
            expect(error).toBeInstanceOf(AppError);
        }
    })

    it("error should be throwed because negative quantity", async () => {
        // given
        const data = {
            sku: "TES0000",
            name: "Produto nº 1",
            quantidade: -100,
            estoque_max: 200
        };

        // when
        try {
            const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });
        } catch (error) {
            
            // then
            expect(error).toBeInstanceOf(AppError);
        }
    })

    it("error should be throwed because quantity is higher than stock", async () => {
        // given
        const data = {
            sku: "TES0000",
            name: "Produto nº 1",
            quantidade: 300,
            estoque_max: 200
        };

        // when
        try {
            const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });
        } catch (error) {

            // then
            expect(error).toBeInstanceOf(AppError);
        }
    })
});

describe("ProductDeleteService", () => {
    let productRepo;
    let productsService;

    beforeEach(() => {
        productRepo = new ProductRepoInMemory();
        productsService = new ProductsService(productRepo);
    });

    it("product should be deleted", async () => {
        // given
        const data = {
            sku: "TST0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };

        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when

        const resposta = await productsService.executeDelete(product.id);

        // then
        expect(resposta).toEqual("Produto deletado.");
    });

    it("error should be throwed because id doesn't exists", async () => {
        // given
        const data = {
            sku: "TST0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };
        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        try {
            const resposta = await productsService.executeDelete(product.id + 1);
        } catch (error) {

            // then
            expect(error).toBeInstanceOf(AppError);
        }
    });
});

describe("ProductShowAndDetailsService", () => {
    let productRepo;
    let productsService;

    beforeEach(() => {
        productRepo = new ProductRepoInMemory();
        productsService = new ProductsService(productRepo);
    });

    it("all products should be in response", async () => {
        // given
        const data1 = {
            sku: "TST0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };
        const data2 = {
            sku: "TST1111",
            name: "Produto nº 2",
            quantidade: 10,
            estoque_max: 200
        };

        const [ product1 ] = await productsService.executeCreate({sku: data1.sku, nome: data1.name, quantidade: data1.quantidade, estoque_max: data1.estoque_max});
        const [ product2 ] = await productsService.executeCreate({sku: data2.sku, nome: data2.name, quantidade: data2.quantidade, estoque_max: data2.estoque_max});

        // when
        const resposta = await productsService.executeShowAll();

        // then
        expect(resposta).toHaveProperty("listaProdutos");
        expect(resposta).toHaveProperty("listaEstoqueCritico");
        expect(resposta.listaProdutos).toHaveLength(2);
        expect(resposta.listaEstoqueCritico).toHaveLength(1);
    });

    it("a single product should be showed", async () => {
        // given
        const data = {
            sku: "TST0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };

        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        const [ resposta ] = await productsService.executeDetails(product.id);

        // then
        expect(resposta).toHaveProperty("sku", "TST0000");
    });

    it("error should be throwed because id doesn't exists", async () => {
        // given
        const data = {
            sku: "TST0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };

        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        try {
            const [ resposta ] = await productsService.executeDetails(product.id + 1);
        } catch (error) {

            // then
            expect(error).toBeInstanceOf(AppError);
        }
    });
});

describe("ProductUpdateService", () => {
    let productRepo;
    let productsService;

    beforeEach(() => {
        productRepo = new ProductRepoInMemory();
        productsService = new ProductsService(productRepo);
    });

    it("product should be updated", async () => {
        // given
        const data = {
            sku: "TES0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };
        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        const [ updatedProduct ] = await productsService.executeUpdate(product.id, {nome: "Produto nº 01", quantidade: 50, estoque_max: data.estoque_max});
            
        // then
        expect(updatedProduct).toHaveProperty("quantidade", 50);
        expect(updatedProduct).toHaveProperty("estoque_max", 200);
        expect(updatedProduct).toHaveProperty("nome", "Produto nº 01");
    })

    it("error should be throwed because negative quantity", async () => {
        // given
        const data = {
            sku: "TES0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };
        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        try {
            const [ updatedProduct ] = await productsService.executeUpdate(product.id, {nome: data.name, quantidade: -20, estoque_max: data.estoque_max});
        } catch (error) {
            
            // then
            expect(error).toBeInstanceOf(AppError);
        }
    })

    it("error should be throwed because quantity is higher than stock", async () => {
        // given
        const data = {
            sku: "TES0000",
            name: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };
        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.name, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        try {
            const [ updatedProduct ] = await productsService.executeUpdate(product.id, {nome: data.name, quantidade: 300, estoque_max: data.estoque_max});
        } catch (error) {

            // then
            expect(error).toBeInstanceOf(AppError);
        }
    })
})

describe("ProductQuantityUpdateService", () => {
    let productRepo;
    let productsService;

    beforeEach(() => {
        productRepo = new ProductRepoInMemory();
        productsService = new ProductsService(productRepo);
    });

    it("quantity should be increase to 105", async () => {
        // given
        const data = {
            sku: "TES0000",
            nome: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };
        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.nome, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        const [ updatedProduct ] = await productsService.executeAdd(product.id, {quantidade: 5});
            
        // then
        expect(updatedProduct).toHaveProperty("quantidade", 105);
    })

    it("quantity should be decrease to 95", async () => {
        // given
        const data = {
            sku: "TES0000",
            nome: "Produto nº 1",
            quantidade: 100,
            estoque_max: 200
        };
        const [ product ] = await productsService.executeCreate({ sku: data.sku, nome: data.nome, quantidade: data.quantidade, estoque_max: data.estoque_max });

        // when
        const [ updatedProduct ] = await productsService.executeDecrease(product.id, {quantidade: 5});
            
        // then
        expect(updatedProduct).toHaveProperty("quantidade", 95);
    })
})