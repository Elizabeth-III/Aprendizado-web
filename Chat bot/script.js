// Variável que guarda o contexto da conversa
var contexto;
/**
 * Envia mensagem para o Watson
 * @param {string} mensagem a mensagem a ser enviada para o Watson.

*/
function enviar_mensagem_watson(mensagem){
/**
 * 
 */
// Variável que busca o request do chat bot
    var http = new XMLHttpRequest();
    var url = 'https://gateway.watsonplatform.net/assistant/api/v1/workspaces/8c5d1b26-0976-4b7d-aee4-c519254bfc3b/message?version=2019-06-18';

    http.open('POST', url, true);
    var inputUsuario = document.getElementById("input-usuario")
    console.log(inputUsuario.value)
    

    //Send the proper header information along with the request
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader("Authorization", "Basic " + btoa("apikey:tUu0-HUcIm1eyAU6j3DpUjF8dNKLqBv0nx2ApB_LzLuD"));

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {

            result = JSON.parse(http.responseText)
            console.log(result)
            respostaWatson = result.output.text[0]

            contexto = result.context
            var chatContent = document.getElementById("chat-content")

            chatContent.innerHTML = chatContent.innerHTML + "<div class = 'caixinha-usuario2'>" + "<p>" + respostaWatson + "</div>" + "</p>";


        }
        else if (http.status !== 200) {
            console.error(http.responseText)
        }
    }

    data = {
        input: {
            text: mensagem
            
        },
        context: contexto
    }

    console.log(data);

    http.send(JSON.stringify(data));

}

enviar_mensagem_watson("")

var inputUsuario = document.getElementById("input-usuario")
var texto = inputUsuario.value
var btnBtn = document.getElementById("btn-btn")
btnBtn.addEventListener("click", function (event) {
    var inputUsuario = document.getElementById("input-usuario")
    var texto = inputUsuario.value
    inputUsuario.value = " "
    var chatContent = document.getElementById("chat-content")
    chatContent.innerHTML = chatContent.innerHTML + "<div class = 'caixinha-usuario'>" + "<p>" + texto + "</div>" + "</p>";

    enviar_mensagem_watson (texto)


})

var input = document.getElementById("input-usuario");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("btn-btn").click();
  }
});