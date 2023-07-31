const authConfig = {
    jwt: {
        secret: String(process.env.AUTH_SECRET) || "default",
        expiresIn: "1d"
    }
}

export default authConfig;