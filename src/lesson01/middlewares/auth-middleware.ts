import {Request, Response, NextFunction} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authInfo = req.headers.authorization

    if (authInfo) {
        let loginPasswordBase64 = authInfo.split(" ")[1];

        const buff = Buffer.from(loginPasswordBase64, 'base64');

        const str = buff.toString('utf-8');

        req.params.authInfo = str;
        next()
    }

    res.status(401).json({
        message: "You are not authorized",
        field: "login&password"
    });
    return
}
