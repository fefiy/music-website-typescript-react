import express from 'express';
import {
  createAlbum,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
} from '../controllers/album';

const router = express.Router();

// Create a new album
router.post('/', createAlbum);

// Get all albums
router.get('/', getAllAlbums);

// Update an album by ID
router.put('/:id', updateAlbum);

// Delete an album by ID
router.delete('/:id', deleteAlbum);

export {router as albumRouter}
