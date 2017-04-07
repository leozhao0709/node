import * as express from "express";

let router = express.Router();

// register page
router.get("/signup", (req: express.Request, res: express.Response) => {
    res.render("sign/signup");
});

// submit register information
router.post("/signup", (req: express.Request, res: express.Response) => {

});

// login page
router.post("/signin", (req: express.Request, res: express.Response) => {
    res.render("/sign/signin");
});

// submit login information
router.post("/signin", (req: express.Request, res: express.Response) => {

});

// log out
router.post("/signout", (req: express.Request, res: express.Response) => {

});

export = router;