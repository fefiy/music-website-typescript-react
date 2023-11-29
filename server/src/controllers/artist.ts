import { Request, Response } from "express";
import { Artist, IArtist } from "../models/artist";
import { create } from "domain";

// Create a new artist
export const createArtist = async (req: Request, res: Response) => {
  console.log("create artist callded");
  try {
    // console.log(req.body);
    const artistData: IArtist = req.body;
    const newArtist = new Artist(artistData);
    const savedArtist = await newArtist.save();
    return res.status(201).json(savedArtist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all artists
export const getAllArtists = async (_: Request, res: Response) => {
  try {
    console.log("getl all artist callded");
    const artists = await Artist.find();
    // console.log(artists)
    return res.status(200).json(artists);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Update an artist by ID
export const updateArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedArtist = await Artist.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedArtist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete an artist by ID
export const deleteArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await Artist.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
