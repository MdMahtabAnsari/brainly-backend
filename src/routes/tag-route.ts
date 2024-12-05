import {getTags} from "../controllers/tag-controller";
import {Router} from "express";
import {validateToken} from "../validators/token-validators";

const tagRouter = Router();

tagRouter.get('/all',validateToken,getTags);

export default tagRouter;