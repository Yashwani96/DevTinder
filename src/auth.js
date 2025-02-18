const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("admin is unauthorized");
  } else {
    next();
  }
};

module.exports = { adminAuth };
