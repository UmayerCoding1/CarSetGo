const verifyFrontendOnly = (req, res, next) => {
  const origin = req.get("origin") || "";
  const referer = req.get("referer") || "";

  const allowedOrigin = "https://carsetgo.vercel.app";

  if (origin.startsWith(allowedOrigin) || referer.startsWith(allowedOrigin)) {
    return next();
  }

  return res.status(403).json({ error: "Forbidden: Invalid request source" });
};

export default verifyFrontendOnly;
