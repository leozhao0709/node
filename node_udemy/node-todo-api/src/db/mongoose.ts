import * as mongoose from 'mongoose';
export const dbserverUrl = `mongodb://localhost:27017/`;
export const dbName = 'TodoApp';

mongoose.connect(process.env.MONGODB_URI || `${dbserverUrl}${dbName}`);

export default mongoose;