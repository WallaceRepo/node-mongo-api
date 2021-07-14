const dotenv = require("dotenv")
dotenv.config()

const config = {
    currEnv: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    //dbLoadBatchSize: 10000,
    db: {
      dbURI: `mongodb+srv://${process.env.MDB_NAME}:${process.env.MDB_PASSWORD}@cluster0.7xtz0.mongodb.net/${process.env.MDB}?retryWrites=true&w=majority`,
     },
}

module.exports = config