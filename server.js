import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express()
import morgan from "morgan";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers
import eventRouter from './routes/eventRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import vacationRequestRouter from './routes/vacationRequestRouter.js'

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('It works')
})

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' })
})

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});

app.post('/', (req, res) => {
    console.log(res);
    res.json({ message: 'data received', data: req.body })
})

app.use('/api/v1/vacation-requests', authenticateUser, vacationRequestRouter)
app.use('/api/v1/events', authenticateUser, eventRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' })
})

app.use(errorHandlerMiddleware)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'something went wrong' })
})

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`server running on PORT ${port}...`);
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}

// app.listen(port, () => {
//     console.log(`server running on PORT ${port}...`);
// })

