import express from 'express';
import cookieParser from "cookie-parser";
import routes from "./routes";
import serverConfig from "./configs/server-config";
import {connectDB} from "./configs/db-config";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

routes(app);

app.listen(serverConfig.PORT,async ()=>{
    await connectDB();
    console.log(`Server running on port http://localhost:${serverConfig.PORT}`);
});



