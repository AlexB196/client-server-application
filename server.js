//mai jos am introdus libraria 'socket.io' pe server.
//pentru a crea serverul am scris "3000" ce reprezinta portul pe care vreau
//ca serverul sa ruleze.
const io = require('socket.io')(3000)

const users = {}


//mai jos am creat o functie ce va fi apelata de fiecare data cand
//un user nou se conecteaza la server. Fiecarui user i se atribuie un socket
io.on('connection', socket => {

  //mai jos stocam informatiile despre fiecare user. Atunci cand
  //un user se conecteaza pe server si isi introduce numele, informatia va
  //fi stocata pe server, intr-un obiect "users", care a fost creat
  //la linia 6
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  //mai jos ma asigur ca mesajul trimis de catre un utilizator este 
  //preluat de catre server si apoi transmis catre restul participantilor
  //la sesiunea de chat
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  //mai jos, atunci cand un user se deconecteaza de la chat
  //acesta va fi sters din lista de useri 
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})