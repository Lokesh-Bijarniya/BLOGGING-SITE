import { Router } from "express";
import { createAuthor } from "../controllers/authorController.js";

const router = Router();

router.post('/', createAuthor);

export default router;