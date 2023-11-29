import { Request, Response } from 'express';
import { Song, ISong } from '../models/song';

// Get all songs
export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find().populate('album').populate('artist');
    // console.log(songs)
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add a new song
export const addSong = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    console.log("add song callded")
    const songData: ISong = req.body;
    const newSong = new Song(songData);
    const savedSong = await newSong.save();
   return res.status(201).json(savedSong);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message);
  }
};

// Update a song by ID
export const updateSong = async (req: Request, res: Response) => {
  try {
    console.log("update song callded")
    const { id } = req.params;
    console.log(id)
    // console.log(req.body)
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, { new: true }).populate('album').populate('artist')
    // console.log("update song",updatedSong)
    if (!updatedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }
  return  res.status(200).json(updatedSong);
  } catch (error) {
    console.log(error)
   return res.status(500).send(error.message);
  }
};

// Delete a song by ID
export const deleteSong = async (req: Request, res: Response) => {
  try {
    console.log("deleting song callded")
    const { id } = req.params;
    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(204).send(); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getSongsByAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      const { albumId } = req.params;
  
      // Find all songs for the specified album
      const songs = await Song.find({ album: albumId }).populate('album').populate('artist');
  
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
export default {
  getAllSongs,
  addSong,
  updateSong,
  deleteSong,
};
