// import mongoose from "mongoose"


// export const ConnectDB = async() => {
//     try {
//         const conn= await mongoose.connect(process.env.MONGO_URI)
//         console.log(`MongoDB Connected ${conn.connection.host}`)
//     } catch (error) {
//         console.error(`Error : ${error.message}`);
//         process.exit(1);
//     }
// }

import mongoose from "mongoose";

// Store the database connection state
let isConnected = false;

export const ConnectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    isConnected = conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
