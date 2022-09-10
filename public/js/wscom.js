let active = false;
const socket = io()
socket.emit('bot','init')
const qrcode = document.querySelector('.qrcode.un')
qrcode.addEventListener('click', connectWpp)

const buttons = document.querySelectorAll('.control button')
buttons.forEach((elem) => { elem.addEventListener('click', (ev) => { buttonStart(elem.value) }) })

socket.on('msg', (msg) => { console.log(msg) })
socket.on('bot', (msg) => {
  
    switch(msg){
        case 'qrcode':
            qrcode.src = './img/qrcode-start.png'
            qrcode.setAttribute('class', 'qrcode')
            active=true
        
        break;
        case 'closecon':
            socket.emit('bot','connected')
            qrcode.src = './img/qrcode-conected.png'
            qrcode.setAttribute('class', 'qrcode')
            active = true
                
        break;

    }
        
    
    

})


function buttonStart(value) {
    alert(value)
}

function connectWpp() {
    
    if (active == true) {
        return
    } else {
        qrcode.src = '/img/fire-load.png'
        qrcode.setAttribute('class', 'qrcode loading')
        setTimeout(async ()=>{await socket.emit('bot', 'connect')   },3000)
        
    }
}