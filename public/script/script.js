const sock = io()

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
  
conversa.innerHTML+=`   <div class="msgs">
<img class="user" src="${msg.perfil}" alt="image">
<p>
   <b>${msg.numero}</b>: ${msg.message}
</p>
</div>`

})