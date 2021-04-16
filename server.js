var express = require('express');
var app = express();
app.use(express.static(client/build));
app.listen(process.env.PORT || 8080);
