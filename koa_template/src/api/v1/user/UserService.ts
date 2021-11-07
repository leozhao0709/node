import compose from '@app/utils/compose';
import { logger1, logger2 } from '../../../middlewares/logger';

const a = async function () {
  console.log('.......123');
  return 'all users';
};

const UserService = {
  getAll: compose(logger1, logger2, a),
};

export default UserService;
