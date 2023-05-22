import { Response } from 'express';
import { status_code } from './model';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(status_code.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(status_code.success).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
}

export function insufficientParameters(res: Response) {
    res.status(status_code.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(status_code.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: 'API error',
        DATA: err
    });
}