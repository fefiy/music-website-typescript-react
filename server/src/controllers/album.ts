import { Request, Response } from 'express';
import { Album, IAlbum } from '../models/album';

// Create a new album
export const createAlbum = async (req: Request, res: Response): Promise<void> => {
    console.log("create album caldeded")
    // console.log(req.body)
  try {
    const albumData: IAlbum = req.body;
    const newAlbum = new Album(albumData);
    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all albums
export const getAllAlbums = async (_: Request, res: Response): Promise<void> => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update an album by ID
export const updateAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedAlbum = await Album.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete an album by ID
export const deleteAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

