import { Router } from "express";
const router = Router();

router.get("/test", function (req, res) {
  res.json({ message: "message" });
});

router.post("/add", function (req, res) {
  res.json({ message: "adding...", books: [1, 2, 3] });
});

export default router;
