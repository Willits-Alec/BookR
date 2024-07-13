const router = require("express").Router();

router.use("/authController", require("./authRoutes"));
router.use("/bookController", require("./bookRoutes"));

router.use("/", require("./swagger"));

module.exports = router;