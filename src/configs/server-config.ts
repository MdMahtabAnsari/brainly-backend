import {config} from 'dotenv';
import ms from 'ms';
config();

export default {
    // Port configuration
    PORT: process.env.PORT || 3000,
    // Database URL
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/express-mongo',
    // JWT configuration
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRY: ms(process.env.ACCESS_TOKEN_EXPIRY || '15m'),
    REFRESH_TOKEN_EXPIRY: ms(process.env.REFRESH_TOKEN_EXPIRY || '7d'),
    // Bcrypt configuration
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS!) || 10,
    //     Environment configuration
    NODE_ENV: process.env.NODE_ENV || 'development'

}
