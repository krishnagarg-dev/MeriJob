
const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});

  if (!result.success) {
    const issues =
      result.error instanceof ZodError ? result.error.issues : [];

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  req.body = result.data;
  return next();
};

module.exports = validate;