import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("login");
});

// del formulario te llevas el nombre como body y lo guardas con req.session.nombre
// aca no tenes que importar el modulo session? O ya te corre con todo lo que importaste en server?
router.post("/", (req, res) => {
    const { nombre } = req.body;
    console.log(nombre);
    req.session.nombre = nombre;
    res.redirect("/api/productos");
});


export default router;