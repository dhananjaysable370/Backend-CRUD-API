import express from "express";
import { create, delUser, oneUser, read, update } from "../controllers/userController.js";

const router = express.Router()

router.get('/read', read);
router.get('/oneuser/:id', oneUser);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', delUser);

export default router;