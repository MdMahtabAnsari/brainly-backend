import {signUp,signIn} from "../controllers/user-controller";
import {Router} from "express";
import {bodyValidator} from "../middlewares/validator-middleware";
import {userZodSchema} from "../utils/zod-schema/user-zod-schema";

const userRouter = Router();

userRouter.post('/signUp',bodyValidator(userZodSchema) ,signUp);
userRouter.post('/signIn',bodyValidator(userZodSchema) ,signIn);

export default userRouter;