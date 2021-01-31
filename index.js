const express = require('express');
const app = express();


app.set('port',process.env.PORT || 4000);

// app.use(routes);

app.use(require('./routes/rutas'));

app.listen(app.get('port'),()=>{
  console.log(`Server on port ${app.get('port')}`);
});