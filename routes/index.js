const router = require("express").Router();

router.use("/users", require("./authRoutes"));
router.use("/books", require("./bookRoutes"));

router.use("/", require("./swagger"));

module.exports = router;