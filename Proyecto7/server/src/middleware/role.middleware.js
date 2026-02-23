export function requireRole(...roles) {
  return (req, res, next) => {
    console.log("roles allowed:", roles);
    console.log("req.user:", req.user);
    console.log("req.user.role:", req.user?.role);

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        details: { got: req.user.role, expected: roles },
      });
    }

    next();
  };
}