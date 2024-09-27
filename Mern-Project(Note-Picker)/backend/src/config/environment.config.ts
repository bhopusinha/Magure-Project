import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    port: process.env.PORT || 4000,
    url: {},
  },
  db: process.env.MONGO_URL,
  environment: {},
  session_secret: process.env.SESSION_SECRET,
};
