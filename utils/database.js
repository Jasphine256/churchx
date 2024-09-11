import mongoose from "mongoose"

// Keeping track of connection status with a reference
let connection = false

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    // If a connection already exists, use it
    if (connection) {
        console.log('_________________________________________________________')
        console.log('DATABASE ALREADY CONNECTED')
        console.log('_________________________________________________________')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'church-x',
        });
        console.log('_________________________________________________________')
        console.log('CONNECTION TO DATABASE SUCCESSFUL')
        console.log('_________________________________________________________')
        connection = true

    } catch (error) {
        console.log('_________________________________________________________')
        console.log('DATABASE CONNECTION ERROR :\n', error)
        console.log('_________________________________________________________')
    }
};
