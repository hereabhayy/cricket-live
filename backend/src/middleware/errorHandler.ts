export const errorHandler = (err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

export default errorHandler;