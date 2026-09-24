export function authorizeModification(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  const userRole = req.user.role;
  const currentUserId = String(req.user.id || req.user.userId);
  const targetUserId = req.params.userId;

  if (
    userRole === "parent" ||
    (userRole === "child" && currentUserId === targetUserId)
  ) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}