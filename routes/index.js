const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/books", require("./bookRoutes"));

router.use("/reviews", require("./reviewRoutes"));
router.use("/recommendations", require("./recommendationRoutes"));

router.use("/", require("./swagger"));

module.exports = router;