import {createContent,getUserContent,deleteUserContent} from "../controllers/content-controller";
import {Router} from "express";
import {validateToken} from "../validators/token-validators";
import {contentZodSchema,paramContentZodSchema} from "../utils/zod-schema/content-zod-schema";
import {bodyValidator,paramValidator} from "../middlewares/validator-middleware";

const contentRouter = Router();

contentRouter.post('/content',validateToken,bodyValidator(contentZodSchema),createContent);
contentRouter.get('/content',validateToken,getUserContent);
contentRouter.delete('/content/:id',validateToken,paramValidator(paramContentZodSchema),deleteUserContent);

export default contentRouter;
