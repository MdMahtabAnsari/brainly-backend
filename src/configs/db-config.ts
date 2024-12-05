import {connect} from "mongoose";
import serverConfig from "./server-config";

export const connectDB = async (tryCount:number = 0) => {
    try {
        await connect(serverConfig.DB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database');
        console.log(error);
        if (tryCount < 5) {
            console.log('Retrying in 5 seconds');
            setTimeout(() => {
                connectDB(tryCount + 1);
            }, 5000);
        }
    }
}
