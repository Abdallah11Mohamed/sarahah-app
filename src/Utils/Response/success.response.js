export const successResponse = ({
    res,
    status = 200,
    data = null,
    message = "Success"
}) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};