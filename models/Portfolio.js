import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicId: String, // only store URL
});

export default mongoose.model('Portfolio', portfolioSchema);
