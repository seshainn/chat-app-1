import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URI)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Mongodb connected successfully')
        })
        connection.on('error', (err) => {
            console.log("Connection to MongoDB error: " + err)
            process.exit()
        })
    } catch (error) {
        console.log("something went wrong when connecting to MongoDB: " + error)
    }
}