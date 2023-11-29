import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { IUser } from "../models/user";
import jwt from "jsonwebtoken"
export const register =  async (req: Request, res: Response) => {
    console.log("user register callded")
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg:"User Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "user registerd succefully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ messege: "No user Found"});
    }
    const isPassward: boolean = bcrypt.compare(password, user.password);
    if (!isPassward) {
      return res.status(401).json({ type: "Wrong Password" });
    }
    
   const token =  jwt.sign({id:user._id, role:user.role}, "secret", 
   {expiresIn: "24h"})
    return res.status(200).json({token , user:user})
  } catch (err) {}
};


export const addOrRemoveArtistToFav = async(req:Request, res:Response)=>{
  try{
    console.log("add artist to fav callded")
    const {userId, artistId} = req.params

    const user =await  User.findById(userId)
    if(!user){
      return res.status(400).json({msg:"user is not found"})
    }

    if(user.favArtist.includes(artistId)){
      //  if found remove
      user.favArtist = user.favArtist.filter((favid)=> favid !== artistId)
    }else{
      // not found so add
      user.favArtist.push(artistId)
    }
    await user.save()
    return res.status(201).json({msg:"user pdated succefully"})
  }catch(error){
    return res.status(500).send(error)
  }
}
export const addOrRemoveAlbumToFav = async(req:Request, res:Response)=>{
  try{
    console.log("add artist to fav callded")
    const {userId, albumId} = req.params

    const user =await  User.findById(userId)
    if(!user){
      return res.status(400).json({msg:"user is not found"})
    }

    if(user.favalbum.includes(albumId)){
      //  if found remove
      user.favalbum = user.favArtist.filter((favid)=> favid !== albumId)
    }else{
      // not found so add
      user.favalbum.push(albumId)
    }
    await user.save()
    return res.status(201).json({msg:"user pdated succefully"})
  }catch(error){
    return res.status(500).send(error)
  }
}

export const addOrRemoveSongToFav = async(req:Request, res:Response)=>{
  try{
    console.log("add song to fav callded")
    const {userId, songId} = req.params

    const user =await  User.findById(userId)
    if(!user){
      return res.status(400).json({msg:"user is not found"})
    }

    if(user.favsong.includes(songId)){
      //  if found remove
      user.favsong = user.favsong.filter((favid)=> favid !== songId)
    }else{
      // not found so add
      user.favsong.push(songId)
    }
    await user.save()
    return res.status(201).json({msg:"user pdated succefully"})
  }catch(error){
    return res.status(500).send(error)
  }
}