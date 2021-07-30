import create_new_user from './createUser';
import login_user from './loginUser';
import dashboard from './dashboard';

const userController = {};

userController.create_new_user = create_new_user;
userController.login_user = login_user;
userController.dashboard = dashboard;

module.exports = userController;