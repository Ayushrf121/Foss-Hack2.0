// Joi validation library for JavaScript. 
import Joi from "joi";

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(14),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(20)
    });
    const { error } = schema.validate(req.body);
    // 400 Bad request!
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message, 
        });
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(14)
    })
    const {error} = schema.validate(req.body);
    // 400 Bad request!
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message, 
        });
    }
    next();
}

export { signupValidation, loginValidation };