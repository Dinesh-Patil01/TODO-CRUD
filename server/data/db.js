import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb' 
dotenv.config()


const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://dineshpatil6001:jzr3ecccZ2vwdrow@cluster0.8gk8m.mongodb.net/TODO"

  const options = {
    ServerApi : {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
  }

  let client;

  const connectToMongoDB = async () => {
    if(!client) {
        try{
            client = await MongoClient.connect(uri, options);
            console.log('Connected to MongoDB');

        }catch(error) {
            console.error('Failed to connect to MongoDB', error);
            throw error;
        }
    }
    return client;
  }

  const getConnectedClient = () => client;

  export { connectToMongoDB, getConnectedClient };


