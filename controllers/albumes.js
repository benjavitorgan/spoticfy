const conn = require("../db");

const getAlbumes = (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
    conn.query = ("SELECT albumes.nombre AS nombre, albumes.id AS id, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON albumes.artista = artistas.id", function (err,results) {
        if (err) return console.error ("Error: " + err.message);
        console.log (results);
        res.json(results);
    })
};

const getAlbum = (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */

        conn.query = ("SELECT albumes.nombre AS nombre, albumes.id AS id, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = ?", [req.params.id], function (err,results) {
            if (err) return console.error ("Error: " + err.message);
            console.log (results);
            res.json(results);
        })
};

const createAlbum = (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
        conn.query = ("INSERT INTO albumes (nombre, artista) VALUES (?,?)", [req.body.nombre, req.body.artista], function (err,results) {
            if (err) return console.error ("Error: " + err.message);
            console.log(results)
            res.send("Creado")
        })
};

const updateAlbum = (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
        conn.query = ("UPDATE albumes SET nombre = ?, artista = ? WHERE id = ?", [req.body.nombre, req.body.artista, req.params.id], function (err,results) {
            if (err) return console.error ("Error: " + err.message);
            console.log (results);
            res.send("Actualizado.")
        })
};

const deleteAlbum = (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    conn.query = ("DELETE FROM albumes WHERE id = ?", [req.params.id], function (err,results) {
        if (err) return console.error ("Error: " + err.message);
        console.log (results);
        res.send("Borrado.")
    })
};

const getCancionesByAlbum = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    conn.query = ("SELECT canciones.nombre AS nombre, canciones.id AS id, albumes.id AS nombre_album, artistas.id AS nombre_artista, canciones.duracion, canciones.reproducciones FROM canciones JOIN albumes ON canciones.album = albumes.id JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = '" + req.params.id + "'", function (err,results) {
        if (err) return console.error ("Error: " + err.message);
        console.log (results);
        res.json(results);
    })
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
