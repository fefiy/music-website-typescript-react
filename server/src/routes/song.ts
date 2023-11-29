import express from 'express';
import { getAllSongs, addSong, updateSong, deleteSong, getSongsByAlbum } from '../controllers/song';
import { verifyToken, isAdmin } from '../middleware/verifyToken';
const router = express.Router();

// Get all songs
router.get('/', getAllSongs);

// Add a new song
router.post('/', verifyToken, isAdmin, addSong);

// Update a song by ID
router.put('/:id', verifyToken, isAdmin,updateSong);

// Delete a song by ID
router.delete('/:id', deleteSong);

// Get all songs for a specific album
router.get('/album/:albumId', getSongsByAlbum);

export {router as songRouter};
