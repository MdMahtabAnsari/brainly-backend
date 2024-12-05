import {refreshToken} from "../controllers/token-controller";
import {Router} from "express";
import {validateRefreshToken} from "../validators/token-validators";

const tokenRouter = Router();

tokenRouter.post('/refresh',validateRefreshToken,refreshToken);

export default tokenRouter;