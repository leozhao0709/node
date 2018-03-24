import * as mongoose from 'mongoose';
import { environment } from '../environment/environment';

mongoose.connect(process.env.MONGODB_URI || environment.MONGODB_URI);

export default mongoose;