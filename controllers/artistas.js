const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
   conn.query ("SELECT * FROM artistas", (err, results) => {
       if (err) return console.error ("Error: " + err.message);
       console.log (results);
       res.json (results);
   });
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */

    conn.query("SELECT * FROM artistas WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return console.error ("Error: " + err.message);
        console.log (results);
        res.json (results);
    });
};

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
   conn.query("INSERT INTO artistas (nombre) VALUES (?)", [req.body.nombre], (err, results) => {
       if (err) return console.error ("Error: " + err.message);
       console.log(results);
       res.send("Creado.")
   });
};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
   conn.query ("UPDATE artistas SET nombre = ? WHERE id = ?", [req.body.nombre, req.params.id], (err, results) => {
       if (err) return console.error ("Error: " + err.message);
       console.log(results);
       res.send("Actualizado.")
   });
};

const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    conn.query ("DELETE FROM artistas WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return console.error ("Error: " + err.message);
        console.log(results);
        res.send("Eliminado.")
    });
};

const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
    conn.query ("SELECT * FROM albumes INNER JOIN artistas ON artistas.id = ?", [req.params.id], (err, results) => {
        if (err) return console.error ("Error: " + err.message);
        console.log (results);
        res.json(results);
    });
};

const getCancionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    conn.query ("SELECT * FROM canciones INNER JOIN artistas ON artistas.id = ?", [req.params.id], (err, results) => {
        if (err) return console.error ("Error: " + err.message);
        console.log (results);
        res.json (results);
    })
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
