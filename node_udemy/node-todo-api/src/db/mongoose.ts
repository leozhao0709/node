import * as mongoose from 'mongoose';
export const dbserverUrl = `mongodb://localhost:27017/`;
export const dbName = 'TodoApp';

mongoose.connect(`${dbserverUrl}${dbName}`);

export default mongoose;