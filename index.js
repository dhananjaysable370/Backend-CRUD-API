import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from './routes/userRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors())

const dbConnect = async (url) => {
    try {
        (await mongoose.connect(url))
    } catch (error) {
        console.log(`Error occured while connecting to db ${error}`)
    }
}

dbConnect(process.env.MONGO_URL).then(() => {
    console.log('Connected to mongodb.')
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(`Error occured while connecting to db ${error}`)
});

app.use('/api/v1', router);

app.use((req, res, next) => {
    res.status(404).send("Route not found");
})