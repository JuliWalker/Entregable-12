const express = require('express');
// cambiarlo por -- import express  from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import 'dotenv/config'

const morgan = require('morgan');
const app = express();
const PORT = 8080



/** Middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        // aca en vez de conectarnos con Mongoose nos estamos conectando con MongoStore - Esto no usa una collection? Usa algo parecido a las sessions pero de mongo?
        store: MongoStore.create({
            mongoUrl: process.env.DB_MONGO,
            ttl: 60 * 10 // 10 minutes
            })
    }
));


/** Views */
app.set('views', 'src/views');
app.set('view engine', 'ejs');


/** Routes */
import homeRouter from './routes/home.js';
import routesProducts from './routes/products'
// import routesCart from './routes/cart'
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';

app.use('/', homeRouter);
app.use('/api/productos',routesProducts)
// app.use('/api/carrito',routesCart)
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);


/** Server */
try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}