const verifyFrontendOnly = (req, res, next) => {
  const origin = req.get("origin") || "";
  const referer = req.get("referer") || "";

  const allowedOrigin = "http://localhost:5173";

  if (origin.startsWith(allowedOrigin) || referer.startsWith(allowedOrigin)) {
    return next();
  }

  return res.status(403).json({ error: "Forbidden: Invalid request source" });
};

export default verifyFrontendOnly;
