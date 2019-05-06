export const envDefault = {
  ENV: 'development',
  MONGODB_URI: `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@cluster0-sizbw.mongodb.net/shop?retryWrites=true`,
  PORT: 5000,
};
