const express = require('express');
const baseRouter = express.Router();

baseRouter.use('/', require('./account'));
baseRouter.use('/', require('./auth'));
baseRouter.use('/', require('./booking'));
baseRouter.use('/', require('./cat_sitter'));
baseRouter.use('/', require('./cat_owner'));
baseRouter.use('/', require('./chat'));
baseRouter.use('/', require('./file'));
baseRouter.use('/', require('./find_cat_sitter'));
baseRouter.use('/', require('./payment'));
baseRouter.use('/', require('./review'));
baseRouter.use('/', require('./two_factor_auth'));
baseRouter.use('/', require('./user'));

module.exports = { baseRouter };