
const sock = io()

//eventos websocket

sock.on('localstorage',(key)=>{
    console.log('localstorage')

    localStorage.setItem('key',key)
    
})
sock.on('connection',(id)=>{
    
    const data=localStorage.getItem('key')
    if(!data){
        sock.emit('controlstart')    
    }
    sock.emit('controlstart',data)
})
sock.on('conn', (msg) => {
console.log(msg)
    const img=document.querySelector('#qrcode')
    const info=document.querySelector('#info')
   const buttons=document.querySelector('.buttons')
    if(msg=='init'){
    img.innerHTML=`<img src='./img/qrcode-start.png'>`
    
    }
    if(msg=='connecting'){
        img.innerHTML=`<img class="rotate" src='https://imagensemoldes.com.br/wp-content/uploads/2020/07/Imagem-Loading-PNG-1024x1024.png'>`


    }
    if(msg=='finish'){
        buttons.innerHTML=`<button id="disconnect">desconectar</button>`
        img.innerHTML=` <img class="on" src="./img/icon.png" alt="">`
        info.innerText=`🟢conectado`
    }

})

sock.on('msgTxt',(msg)=>{
    const conversa=document.querySelector('#conversas')
  let id='id_'+Math.random().toString(36).replace('.','')
conversa.innerHTML+=`   <div id='${id}' class="msgs">
<img class="user" src="${msg.perfil}" alt="image">
<p>
   <b>${msg.nome||msg.numero}</b>: ${msg.message}
</p>
<button value='${JSON.stringify(msg)}' onclick='response(this.value)' class='send'>&#9993;</button>
<button value='${id}' onclick='deletee(this.value)' class='close'>&#10008;</button>
</div>
</div>`

})

//buttons events
function deletee(id){
    const element= document.getElementById(id)
    element.style.filter='opacity(0)'
    setTimeout(()=>{if (element.parentNode) {
       
        element.parentNode.removeChild(element);
          }},2000)
    
}
function response(msg){
    const mesage=JSON.parse(msg)
    let message=prompt(`digite a resposta para ${mesage.numero}`)
    
  
    if(mesage.numero && message){
       
        const response={message,numero:mesage.numero,webmsg:mesage.webMessage}
       
        console.log(response)
        sock.emit('msg',response)
    }
}