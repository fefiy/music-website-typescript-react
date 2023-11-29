import { Request, Response } from "express";
import { PlayList, IPlayList } from "../models/playlist";
import { Song } from "../models/song"; // Assuming you have a Song model

export const createPlaylist = async (req: Request, res: Response) => {
  try {
    console.log("create playlist callded");
    // console.log(req.body);
    const playlistData: IPlayList = req.body;
    const newPlaylist = new PlayList(playlistData);
    const savedPlaylist = await newPlaylist.save();
    return res.status(201).json(savedPlaylist);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Add songs to a specific playlist
// Add a single song to a specific playlist with check for existing song
export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    console.log("song added to play list");
    const { playlistId, songId } = req.params;
    // const { songId } = req.body;
    console.log(playlistId, songId);

    // Check if the playlist exists
    const playlist = await PlayList.findById(playlistId);
    if (!playlist) {
      console.log("playlist not founded");
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Check if the song already exists in the playlist
    const existingSong = playlist.songs.find(
      (song) => song.toString() === songId
    );
    if (existingSong) {
      console.log("song exist in playlist");
      return res.status(400).json({
        message: "Song already exists in the playlist",
        existingSong: existingSong,
      });
    }

    // Assuming Song model has a reference named 'Song'
    const songToAdd = await Song.findById(songId)
      .populate("album")
      .populate("artist");

    if (!songToAdd) {
      console.log("song do not found");
      return res
        .status(404)
        .json({ message: "Song not found with the provided ID" });
    }
    // Add the song to the playlist
    playlist.songs.push(songToAdd._id);
     await playlist.save();
    return res.status(200).json(songToAdd);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Remove a single song from a specific playlist
export const removeSongFromPlaylist = async (req: Request, res: Response) => {
  try {
    console.log("remove song from play list");
    const { playlistId, songId } = req.params;

    // Check if the playlist exists
    const playlist = await PlayList.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Check if the song exists in the playlist
    const songToMinus = await Song.findById(songId);

    if (!songToMinus) {
      return res
        .status(404)
        .json({ message: "Song not found with the provided ID" });
    }

    // Remove the song from the playlist
    playlist.songs = playlist.songs
      .map((existingSongId: { toString: () => any }) =>
        existingSongId.toString()
      ) // Convert each element to string
      .filter((existingSongId) => existingSongId !== songId);
    const updatedPlaylist = await playlist.save();

    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Delete a playlist by ID
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    console.log("delete playlist callded")
    const { playlistId } = req.params;
    // Check if the playlist exists
    const playlist = await PlayList.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    // Delete the playlist
    await PlayList.findByIdAndDelete(playlistId);
    res.status(204).send(); // 204 No Content indicates a successful deletion
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all playlists for a specific user with songs populated
export const getPlaylistsByUser = async (req: Request, res: Response) => {
  try {
    console.log("get playlist by userID");
    const { userId } = req.params;
    console.log("user Id of playis user", userId);
    // Find all playlists for the specified user and populate the 'songs' field
    const playlists = await PlayList.find({ userId })
      .populate("songs")
      .populate({
        path: "songs",
        populate: [
          { path: "album", model: "Album" }, 
          { path: "artist", model: "Artist" }, 
        ],
      }).exec()
      
    console.log("playlist by from userid", playlists);
    return res.status(200).json(playlists);
  } catch (error) {
    console.log(error)
    console.log("error is occuring whiel fetching playlist by from userid ");
    return res.status(500).send(error.message);
  }
};

export const getPlaylistById = async (req: Request, res: Response) => {
  try {
    const { playlistId } = req.params;
    const playlist = await PlayList.findById(playlistId)
      .populate("songs")
      .populate({
        path: "songs",
        populate: [
          { path: "album", model: "Album" }, 
          { path: "artist", model: "Artist" }, 
        ],
      }).exec()
      console.log("get, playlist by id")
    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
