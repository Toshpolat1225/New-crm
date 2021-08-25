module.exports = function (req, res, next) {
  if (req.session.isAdmin || req.session.isWorker || req.session.isStudent || req.session.isManager) {
    return   next();
  }
  else{
   return  res.redirect("/auth/login");
  }
};
 