const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

let nativeClient;

async function connect() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/docs_assistant';

  await mongoose.connect(uri, {
    dbName: process.env.MONGO_DB || 'docs_assistant',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: Number(process.env.MONGO_POOL_SIZE || 5)
  });

  nativeClient = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000
  });
  await nativeClient.connect();

  return { mongoose, nativeClient };
}

function getNativeDb() {
  if (!nativeClient) {
    throw new Error('Mongo client is not connected');
  }
  return nativeClient.db(process.env.MONGO_DB || 'docs_assistant');
}

module.exports = {
  connect,
  getNativeDb,
  mongoose
};
