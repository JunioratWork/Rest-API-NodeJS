const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const morgan = require('morgan');

//Confiuguracion del puerto
app.set('port', process.env.PORT || 9000)

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas de conexion
app.use(require('./routes/index'));
app.use('/api/movies',require('./routes/movies'));
app.use('/api/izipay',require('./routes/formtoken.js'));

//Emprezar el servidor
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);

})

