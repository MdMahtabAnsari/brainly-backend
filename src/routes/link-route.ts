import {createLink,deleteLink,getLink,getLinkContentByHash} from "../controllers/link-controller";

import {Router} from "express";
import {validateToken} from "../validators/token-validators";
import {paramLinkZodSchema} from "../utils/zod-schema/link-zod-schema";
import {paramUserZodSchema} from "../utils/zod-schema/user-zod-schema";
import {paramValidator} from "../middlewares/validator-middleware";

const linkRouter = Router();

linkRouter.post('/link',validateToken,createLink);
linkRouter.delete('/link',validateToken,deleteLink);
linkRouter.get('/link/:userId',validateToken,paramValidator(paramUserZodSchema),getLink);
linkRouter.get('/link/contents/:hash',paramValidator(paramLinkZodSchema),getLinkContentByHash);

export default linkRouter;