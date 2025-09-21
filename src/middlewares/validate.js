export const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse({
    ...req.body,
    ...req.params,
    ...req.query
  });
  if (!parsed.success) {
    return res.status(400).json({ ok:false, error: parsed.error.flatten() });
  }
  req.validated = parsed.data;
  next();
};
