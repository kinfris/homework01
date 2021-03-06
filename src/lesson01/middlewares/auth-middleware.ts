import {Request, Response, NextFunction} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authInfo = req.headers.authorization

    if (!req.headers.authorization || !req.headers) {
        res.sendStatus(401)
    }

     if(authInfo && authInfo.split(" ")[0] !== "Basic"){
        res.sendStatus(401)
    }

    if (authInfo) {
        let loginPasswordBase64 = authInfo.split(" ");

        const buff = Buffer.from(loginPasswordBase64[1], 'base64');

        const str = buff.toString('utf-8');

        let loginPassword = str.split(":")
        if (loginPassword[0] === "admin" && loginPassword[1] === "qwerty") {
            next();
        }  else {
            res.status(401).send({
                message: "You are not authorized",
                field: "login&password"
            });
        }
    }
}
