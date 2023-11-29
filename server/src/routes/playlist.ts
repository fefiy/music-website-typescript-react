import express from 'express';
import { createPlaylist, addSongToPlaylist, removeSongFromPlaylist, deletePlaylist, getPlaylistsByUser, getPlaylistById } from '../controllers/playlist';

const router = express.Router();

// Create a new playlist
router.post('/', createPlaylist);

// Add songs to a specific playlist
router.post('/song/:songId/:playlistId', addSongToPlaylist);

// Remove a single song from a specific playlist
router.delete('/song/:songId/:playlistId',  removeSongFromPlaylist);

// Get all playlists for a specific user
router.get('/user/:userId', getPlaylistsByUser);

router.get("/:palylistId", getPlaylistById)
// Delete a playlist by ID
router.delete('/:playlistId', deletePlaylist);

export {router as playlistRouter};
