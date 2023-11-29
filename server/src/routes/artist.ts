import express from 'express';
import {
  createArtist,
  getAllArtists,
  updateArtist,
  deleteArtist,
} from '../controllers/artist'

const router = express.Router();

// Create a new artist
router.post('/', createArtist);

// Get all artists
router.get('/', getAllArtists);

// Update an artist by ID
router.put('/:id', updateArtist);

// Delete an artist by ID
router.delete('/:id', deleteArtist);

export  {router as artistRouter};
