const router = require("express").Router();
const { isAuth } = require("../middleware/authMiddleware");
const courseService = require("../services/courseService");
const userService = require("../services/userService");
router.get("/", async (req, res) => {

    const latestCourses = await courseService.getLatest().lean();

    res.render("home", { latestCourses });
});

router.get("/profile", isAuth, async (req, res) => {

    const user = await userService.getInfo(req.user._id).lean();

    const createdCoursesCount = user.createdCourses.length;
    const signUpCoursesCount = user.signedUpCourses.length;

    res.render("profile", { user, createdCoursesCount, signUpCoursesCount });
});

module.exports = router;