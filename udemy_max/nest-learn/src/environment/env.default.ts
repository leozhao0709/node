export const envDefault = {
  ENV: 'development',
  MONGODB_URI: `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@cluster0-sizbw.mongodb.net/shop?retryWrites=true`,
  PORT: 5000,
  SENDGRID_API_KEY_NAME: 'node_max_shop_dev',
  SENDGRID_API_KEY_DEV: process.env.SENDGRID_NODE_MAX_SHOP,
  HOST() {
    return `http://localhost:${this.PORT}`;
  },
};
