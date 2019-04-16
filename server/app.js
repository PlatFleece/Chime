const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
app.use(cors());
// routing
app.use('/', express.static(`${__dirname}/view`));
app.use('/boardOne', express.static(`${__dirname}/view/soundboardOne.html`));
function onConnection(socket) {
  // Updates Display
  socket.on('drawing', data => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log(`listening on port ${port}`));
