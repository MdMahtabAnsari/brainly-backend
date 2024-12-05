import serverConfig from "../../configs/server-config";

interface CookieConfig {
    type:'refreshToken'|'accessToken',
    sameSite:'strict'|'lax'|'none'
}

export const cookieConfigGenerator = (config:CookieConfig)=>{
    if(serverConfig.NODE_ENV === 'development'){
        return {
            httpOnly:true,
            secure:false,
            expires:config.type === 'refreshToken'?new Date(Date.now() + serverConfig.REFRESH_TOKEN_EXPIRY):new Date(Date.now() + serverConfig.ACCESS_TOKEN_EXPIRY),
        }
    }
    else{
        return {
            httpOnly:true,
            secure:true,
            sameSite:config.sameSite,
            expires:config.type === 'refreshToken'?new Date(Date.now() + serverConfig.REFRESH_TOKEN_EXPIRY):new Date(Date.now() + serverConfig.ACCESS_TOKEN_EXPIRY),
        }
    }
}

