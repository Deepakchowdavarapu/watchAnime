import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config({ path: 'C:\\Users\\saide\\Desktop\\WatchAnime-main\\Server\\.env' });

const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl)
  // .then(() => {
  //   console.log('Database connected successfully',mongoDBUrl);
  // })
  // .catch((error) => {
  //   console.error('Error connecting to database:', error);
  // });



const animeSchema = new mongoose.Schema({
  email:String,
  title: String,
  image: String,
  type: String,
  total_episodes: Number,
  rating: Number,
});

const Anime = mongoose.model('Anime', animeSchema);

export default Anime;
