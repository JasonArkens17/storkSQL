import Stork from '../../src/index';
import DB_CONFIG_OBJ from '../../secret/config';

// const DB_CONFIG_OBJ = {
//   host: '',
//   password: '',
//   database: '',
//   port: 3241,
//   user: '',
//   ssl: true
// };

export default new Stork(DB_CONFIG_OBJ, 'pg');
