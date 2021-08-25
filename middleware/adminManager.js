module.exports = function (req, res, next) {
    if (req.session.isAdmin || req.session.isManager) {
      next();
    }
    else{
      return res.redirect("/notfound");
    }
  };