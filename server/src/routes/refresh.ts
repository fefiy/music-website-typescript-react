import express from 'express';
import { refresh } from '../controllers/refresh';
const router = express.Router();

router.get("/:userId", refresh)
export {router as refreshRouter}