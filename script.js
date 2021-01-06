
//pe linia de mai jos am scris locatia unde servarul meu va face host 
const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//mai jos cream un prompt in care fiecare utilizator va trebui sa isi
//scrie numele, iar astfel, acesta va aparea in fereastra de chat cu 
//numele introdus la conectarea pe server.
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

//mai jos am creat o regula prin care atunci cand se trimite un mesaj,
//iar acesta apare pe server, in cazul in case apoi se trimite alt mesaj,
//aplicatia sa nu imi stearga mesajul trimis anterior. 
//Astfel ma asigur ca pot vedea toate mesajele trimise in fereastra de chat
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  //prin comanda de "emit" trimit informatie din partea clientului catre server
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

//functia de mai jos a fost creata pentru a lega mesajele trimise de fisierul
//index.html, iar astfel ma asigur ca mesajul respectiv poate fi vazut 
//in browser
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}