import { apiError } from "../utils/api.error.js";

export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }));

            throw new apiError(
                400,
                "Validation failed",
                errors
            );
        }

        req.validated ??= {};
        req.validated[source] = result.data;

        next();
    };
};