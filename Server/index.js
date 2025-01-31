// const express = require('express');
import cors from 'cors';
import dotenv from 'dotenv';
import User from './Model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import express from 'express'
import Anime from './Model/animeModel.js';

dotenv.config({ path: 'C:\\Users\\saide\\Desktop\\WatchAnime-main\\Server\\.env' });

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        req.userId = decoded.id;
        next();
    });
};

app.post('/Register', async (req, res) => {
    try {
        console.log(`gonna check and Register`);
        const { name, email, password } = req.body;

        // if (!name || !email || !password) {
        //     return res.status(400).json({ message: 'Email and password are required' });
        // }

        const ExistingUser = await User.findOne({ email });

        if (ExistingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 12); // creating hashedPassword

        const NewUser = await User.create({
            name,
            email,
            password: password
        });

        const token = jwt.sign({ id: NewUser._id }, process.env.JWT_SECRET, { expiresIn: '20h' });
        const Data = {
            token:token,
            name:name,
            email:email,
            password:password
        }

        // localStorage is not available in Node.js, so this line is removed
        // res.setHeader('userData', JSON.stringify(userData));
        console.log(`header set`)
        const userData = JSON.stringify(Data)
        res.status(201).json({ message: "changed statement of user registered success", userData});

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "error occur" });    
    }
});

app.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const ExistingUser = await User.findOne({ email });

        if (!ExistingUser) {
            return res.status(409).json({ message: 'No user found' });
        }

        const isPasswordValid = await bcrypt.compare(password, ExistingUser.password);

        if (!isPasswordValid) {
            return res.status(409).json(`Incorrect password`);
        }

        const token = jwt.sign({ id: ExistingUser._id }, process.env.JWT_SECRET, { expiresIn: '20h' });
        const userData = {
            name: ExistingUser.name,
            password: ExistingUser.password,
            email:ExistingUser.email,
            token:token
        };
        // const user = JSON.stringify(userData)
        res.status(200).json({message:`login successfull`,userData});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occurred' });
    }
});

app.get('/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({ name: user.name, starredAnimes: user.starredAnimes });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.put('/user', verifyToken, async (req, res) => {
    try {
        const { starredAnimes } = req.body;
        const user = await User.findByIdAndUpdate(req.userId, { starredAnimes }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({ message: 'Starred animes updated successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.post('/api/starred-anime', async (req, res) => {
    const {email, title, image, type, total_episodes, rating } = req.body;

    try {
        // Check if anime already exists
        const existingAnime = await Anime.findOne({ title ,email});
        if (!existingAnime) {
            // Add new anime
            const newAnime = new Anime({
                email,
                title,
                image,
                type,
                total_episodes,
                rating
            });
            await newAnime.save();
            res.status(201).json({ message: 'Anime saved successfully' });
        } else {
            // Remove existing anime
            await Anime.deleteOne({ title, email });
            res.status(200).json({ message: 'Anime removed successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error processing anime' });
    }
});
app.post("/api/starred-anime-titles", async (req, res) => {
    try {
        const { email } = req.body;
        console.log(`Fetching starred animes for: ${email}`);

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const animes = await Anime.find({ userEmail: email }, "title");
        res.status(200).json(animes);
    } catch (err) {
        console.error("Error fetching anime titles:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const PORT = process.env.PORT || 5775;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log('MONGODB_URL:', process.env.MONGODB_URL);
});