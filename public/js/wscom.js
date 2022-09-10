
const socket = io()
const qrcode = document.querySelector('.qrcode')
qrcode.addEventListener('click', connectWpp)
const buttons = document.querySelectorAll('.control button')
buttons.forEach((elem) => { elem.addEventListener('click', (ev) => { buttonStart(elem.value) }) })

socket.on('msg', (msg) => { console.log(msg) })
socket.on('bot', (msg) => {
    if (msg == 'qrcode') {
        qrcode.src = './img/qrcode-start.png'
        qrcode.setAttribute('class','qrcode')
    }
    if(msg=='closecon')
    qrcode.src = './img/qrcode-conected.png'
    qrcode.setAttribute('class','qrcode')
})


function buttonStart(value) {
    alert(value)
}

function connectWpp() {
   
        socket.emit('bot', 'connect')
    
}