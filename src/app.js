const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const morgan = require('morgan');

//Confiuguracion del puerto
//app.set('port', process.env.PORT || 3000)


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas de conexion
app.use(require('./routes/index'));
app.use('/api/movies',require('./routes/movies'));
app.use('/payment',require('./routes/formtoken.js'));

//Emprezar el servidor
//app.listen(app.get('port'), () =>{
 //  console.log(`Server on port ${app.get('port')}`);
//})

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
  });
