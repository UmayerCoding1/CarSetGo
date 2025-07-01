import express from 'express';
import { createTrackPlatform } from '../controllers/trackPlatform.controller.js';

const router = express.Router();

router.post('/track-platform',createTrackPlatform);

export default  router;