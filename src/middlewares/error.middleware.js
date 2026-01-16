import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    console.error("🔥 Backend Error:", err.message);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            failedRows: Array.isArray(err.errors) ? err.errors : [err.errors], // Ensure always an array
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        failedRows: [{ field: "unknown", message: err.message }],
    });
};

export default errorHandler;
