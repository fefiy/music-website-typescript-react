import { Router } from "express";
const router = Router();
import { register, login, addOrRemoveArtistToFav, addOrRemoveSongToFav, addOrRemoveAlbumToFav } from "../controllers/user";
router.post("/register", register);

router.post("/login", login);
router.post("artist/:userId/:artistId", addOrRemoveArtistToFav)
router.post("/song/:userId/:songId", addOrRemoveSongToFav)
router.post("/album/:userId/:albumId", addOrRemoveAlbumToFav)


export { router as userRouter };
