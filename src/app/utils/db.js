const { MONGO_DB_USER, MONGO_DB_PASS } = process.env;
export const connectionStr = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@cluster0.w09ng.mongodb.net/finalGame?retryWrites=true&w=majority`;
