
const sock = io()

//eventos websocket

sock.on('connection',(id)=>{
   
    sock.emit('controlstart')
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
        buttons.innerHTML=`<button id="disconnect">desconectar</button>
        <button id='disparo'>disparo</button>
        `
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
<button value='${JSON.stringify(msg)}' onclick='generateWidow(this.value)' class='send'>&#9993;</button>
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
function  response(msg){
   
    const mesage=JSON.parse(msg)
   
    let message=document.getElementById('msgres').value

    if(mesage.numero && message){
            
        const response={message,numero:mesage.numero,webmsg:mesage.webMessage}
       
        console.log(response)
        sock.emit('msg',response)
       
    }
destroyWidow()
  
}
function generateWidow(msg){
    const body=document.body
    body.innerHTML+=`<div class='prompt'>
    <h3> resposta para ${(JSON.parse(msg)).numero}</h3>
    <textarea id='msgres' resize='none'>
    </textarea>
    <button type='submit' value='${msg}' onclick='response(this.value)' >enviar</button>
    <button onclick='destroyWidow()'>cancelar</button>
    </div>`

}
function destroyWidow(){
    console.log('deleta')
    const element=document.querySelector('.prompt')
    element.parentNode.removeChild(element);
}