export const createUsers = `
    CREATE TABLE IF NOT EXISTS users
    (
        user_id bigint AUTO_INCREMENT PRIMARY KEY,
        name varchar(200) NOT NULL,
        email varchar(200) NOT NULL,
        password varchar(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;