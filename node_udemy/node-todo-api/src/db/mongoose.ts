import * as mongoose from 'mongoose';

const serverUrl = `mongodb://localhost:27017/`;
const dbName = 'TodoApp';
mongoose.connect(`${serverUrl}${dbName}`);
export default mongoose;