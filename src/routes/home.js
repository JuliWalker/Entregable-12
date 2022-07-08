import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    if(req.session.nombre){
        res.redirect("/api/productos");
    }else{
    res.redirect("/login");
    }
});



export default router;