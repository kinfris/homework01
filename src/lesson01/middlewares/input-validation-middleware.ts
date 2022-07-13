import {Request, Response, NextFunction} from "express";
import {validationResult} from 'express-validator';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: [{
                message: errors.array()[0].msg,
                field: errors.array()[0].param
            }]
        })
    } else {
        next()
    }
}
