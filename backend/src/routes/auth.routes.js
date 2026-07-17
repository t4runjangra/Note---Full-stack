import { Router } from "express";
import { login, register, profile, updateAvatar, uploadCoverAvatar, logout, resendEmail, forgetPassword, resetPassword, refreshAccessToken, updateProfile } from "../controllers/auth.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema, resendEmailSchema, forgetPasswordSchema, passwordResetSchema } from "../validators/auth.validator.js";
import { upload } from "../middlewares/multer.middlewar.js";
import { diskUpload } from "../middlewares/multer.disk.middleware.js";
import { verifyEmail } from "../controllers/auth.controller.js";
import { resendEmailVerificationLimiter, resetPasswordLimiter } from "../middlewares/rateLimit.middleware.js";
const authRouter = Router()

authRouter.post("/register", validate(registerSchema), register)
authRouter.post("/login", validate(loginSchema), login)
authRouter.get("/profile", verifyJWT, profile)
authRouter.post("/refresh-token", verifyJWT, refreshAccessToken)


authRouter.patch(
    "/avatar",
    verifyJWT,
    upload.single("avatar"),
    updateAvatar
);

authRouter.patch(
    "/update-profile",
    verifyJWT,
    updateProfile
);
authRouter.patch(
    "/cover-avatar",
    verifyJWT,
    diskUpload.single("coverAvatar"),
    uploadCoverAvatar
)
authRouter.get("/verify-email/:rawToken", verifyEmail)

authRouter.post("/resend-verification", resendEmailVerificationLimiter, validate(resendEmailSchema), resendEmail)
authRouter.post("/logout", verifyJWT, logout)

authRouter.post("/forget-password", validate(forgetPasswordSchema), forgetPassword)
authRouter.post("/reset-password/:token", resetPasswordLimiter, validate(passwordResetSchema), resetPassword)
export default authRouter
