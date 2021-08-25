module.exports = function (req, res, next) {
    if (req.session.isAdmin || req.session.isManager || req.session.isWorker) {
        next();
    }
    else{
        return res.redirect("/notfound");
    }
  };