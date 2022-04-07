const withAuth = (req, res, next) => {
  // if the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // if the user is logged in : execute next()
    // @NOTE: Next - executes the middleware succeeding the current middleware
    next();
  }
};

module.exports = withAuth;
