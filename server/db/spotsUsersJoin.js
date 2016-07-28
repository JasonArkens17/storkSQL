import DB from './queries';
import dbConnection from './dbConnect';

const spotUserSchema = {
  columns: {
    userid: 'number',
    spotid: 'number'
  },
  tableName: 'spots_users'
};

const SpotsUsers = new DB(dbConnection, spotUserSchema);

export default SpotsUsers;
