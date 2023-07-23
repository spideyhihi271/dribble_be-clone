const authRouter = require('./auth');
const otherRouter = require('./routers')
function route(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/v1', otherRouter);
}

module.exports = route;
