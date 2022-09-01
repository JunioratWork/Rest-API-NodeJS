const express = require('express');
const morgan = require('morgan');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();


//Habilitar bloqueo de CORS
const cors = require('cors');
const lista= ['http://localhost:3000','https://izipay-ejemplo-php.000webhostapp.com','https://prueba55.herokuapp.com','http://127.0.0.1:5501/index.html'];
app.use(cors({origin: lista}));

//Confiuguracion del puerto
//app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas de conexion
app.use(require('./routes/index'));
app.use('/api/movies',require('./routes/movies'));
app.use('/CreatePayment',require('./routes/formtoken.js'));
app.use('/PaymentOrder',require('./routes/PaymentOrderGet.js'));
app.use('/PaymentOrder',require('./routes/PaymentOrderUpdate.js'));
app.use('/Token',require('./routes/TokenCancel.js'));
app.use('/Respuesta',require('./routes/RespuestaIPN.js'));

app.use('/APImovil',require('./routes/servidormovil.js'));

//Emprezar el servidor
//app.listen(app.get('port'), () =>{
 //  console.log(`Server on port ${app.get('port')}`);
//})

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
  });
