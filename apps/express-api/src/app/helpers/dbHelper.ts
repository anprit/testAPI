import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

const initDB = (): Promise<Mongoose | void> => {
  const url = process.env.DB_CONNECTION_URL || "mongodb+srv://adminapi:adminapi@testapidb.z5ow34k.mongodb.net/?retryWrites=true&w=majority";
  const connectOpts: ConnectOptions = {};
  mongoose.connection.once('open', () => {
    console.log('> Connected to database');
  });

  return mongoose.connect(url, connectOpts).catch((err: Error) => {
    console.log(err);
  });
};

export { initDB };
