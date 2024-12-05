import TokenRepository from "../repositories/token-repository";
import UserRepository from "../repositories/user-repository";
import UnauthorizedError from "../utils/errors/unauthorized-error";
import InternalServerError from "../utils/errors/internal-server-error";
import AppError from "../utils/errors/app-error";
import jwt from 'jsonwebtoken';
import serverConfig from '../configs/server-config';
import bcrypt from "bcrypt";
import {TokenPayloadType} from "../utils/types/token-payload-type";

class TokenService {
    private tokenRepository: TokenRepository;
    private userRepository: UserRepository;

    constructor() {
        this.tokenRepository = new TokenRepository();
        this.userRepository = new UserRepository();
    }

    async signToken(username: string) {
        try {
            const user = await this.userRepository.findByUsernameWithoutPassword(username);
            if(!user){
                throw new UnauthorizedError('Invalid user');
            }
            const payload:TokenPayloadType = {
                username: user.username,
                _id: user._id.toString()
            }
            const accessToken = jwt.sign(payload,serverConfig.JWT_SECRET!,{expiresIn:serverConfig.ACCESS_TOKEN_EXPIRY/1000});
            const refreshToken = jwt.sign(payload,serverConfig.JWT_SECRET!,{expiresIn:serverConfig.REFRESH_TOKEN_EXPIRY/1000});
            const hashedRefreshToken = await bcrypt.hash(refreshToken,serverConfig.SALT_ROUNDS);
            const isTokenExist = await this.tokenRepository.findByUserId(user._id);
            if(isTokenExist){
                await this.tokenRepository.deleteByUserId(user._id);
            }
            await this.tokenRepository.create(hashedRefreshToken,user._id);
            return {accessToken,refreshToken};

        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new UnauthorizedError();
            }
        }
    }

    async generateAccessToken(userDetails:TokenPayloadType,refreshToken:string){
        try {

            const isTokenExist = await this.tokenRepository.findByUserId(userDetails._id);
            if(!isTokenExist){
                throw new UnauthorizedError('Invalid user');
            }
            const isTokenMatch = await bcrypt.compare(refreshToken,isTokenExist.token);
            if(!isTokenMatch){
                throw new UnauthorizedError('Invalid token');
            }
            const payload:TokenPayloadType = {
                username: userDetails.username,
                _id: userDetails._id.toString()
            }
            const accessToken = jwt.sign(payload, serverConfig.JWT_SECRET!, {expiresIn: serverConfig.ACCESS_TOKEN_EXPIRY / 1000});

            return{
                accessToken,
                user:userDetails
            }

        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError){
                throw error;
            } else {
                throw new InternalServerError();
            }

        }
    }

}

export default TokenService;