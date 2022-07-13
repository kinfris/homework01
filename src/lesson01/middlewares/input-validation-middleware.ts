import {Request, Response, NextFunction} from "express";
import {validationResult} from 'express-validator';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: [...errors.array().map(err => ({
                message: err.msg,
                field: err.param
            }))],
            resultCode: 1
        })
    } else {
        next()
    }
}
