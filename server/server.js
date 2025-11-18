import 'dotenv/config'
import express from 'express'
import ConnectDb from './utils/db.js'
import cors from 'cors'
import bookingRouter from './routes/booking.routes.js'
import guestRouter from './routes/guest.routes.js'
import settingsRouter from './routes/settings.routes.js'
import cabinRouter from './routes/cabin.routes.js'
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
}

app.use(cors(corsOptions))
app.use('/api/booking', bookingRouter)
app.use("/api/guest", guestRouter)
app.use("/api/setting", settingsRouter)
app.use("/api/cabins", cabinRouter)

ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.log('Failed to connect DB:', err)
})