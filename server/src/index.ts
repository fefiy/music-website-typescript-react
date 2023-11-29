import express from "express"
import dotenv from "dotenv"
import cors from "cors"
const app = express()

dotenv.config()
// middleware
app.use(express.json())
app.use(cors())

// import Routers
import { userRouter } from "./routes/user"
import { playlistRouter } from "./routes/playlist"
import { artistRouter } from "./routes/artist"
import { songRouter } from "./routes/song"
import { albumRouter } from "./routes/album"
import { refreshRouter } from "./routes/refresh"
import {db} from "./config/connect"
// configure router
app.use("/api/artist", artistRouter)
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/playlist", playlistRouter)
app.use("/api/user", userRouter)
app.use("/api/refresh", refreshRouter)


db
const Port:any =  3007
app.listen(Port , ()=>{
    console.log(`app is started on port ${Port}`)
})
