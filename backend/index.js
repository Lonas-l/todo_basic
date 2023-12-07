const express = require('express');
const PORT = process.env.PORT || 8081;
const mongoose = require('mongoose');
const authRoutes = require('./authRouter');

const uri = "mongodb+srv://admin:admin@cluster0.moqiljp.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
const start = async () => {
    try {
        await mongoose.connect(uri)
        app.listen(PORT, () => console.log(`Server is started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
