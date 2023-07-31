export const createProducts = `
    CREATE TABLE IF NOT EXISTS products
    (
        id bigint AUTO_INCREMENT PRIMARY KEY,
        sku varchar(10) NOT NULL,
        name varchar(200) NOT NULL,
        quantidade bigint NOT NULL,
        estoque_max bigint NOT NULL
    );
`;