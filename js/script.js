var chatLog = document.getElementById('chat-log');
var userInput = document.getElementById('user-input');
var sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', (e) => {
	console.log("aqui3");
    sendMessage(userInput.value);
	console.log("aqui1");
});

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage(userInput.value);
    }
});

function sendMessage(message) {
    if (message.trim() === '') return;

    // Mostrar el mensaje del usuario en el chat
    appendMessage('Usuario', message);

    // Enviar el mensaje al ChatGPT (aquí debes implementar la lógica de comunicación con la API)
    // Luego, recibir la respuesta y mostrarla en el chat
    var reply = getChatGPTReply(message);
    appendMessage('ChatGPT', reply);

    // Limpiar el cuadro de entrada
    userInput.value = '';
    userInput.focus();
}

function appendMessage(sender, message) {
    var messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

    function getChatGPTReply(userMessage)	{
		console.log("aqui");
    // Define tu clave de API de OpenAI y la URL de la API
    var apiKey = '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'; // Reemplaza con tu clave de API
    var apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

    // Define los datos que se enviarán a la API de OpenAI
    var requestData = {
        prompt: userMessage,
        max_tokens: 50, // El número máximo de tokens en la respuesta
        temperature: 0.7, // Controla la creatividad de la respuesta (ajusta según tus preferencias)
        stop: '\n', // Define una cadena de cierre para la respuesta
    };
	console.log(requestData);

    // Realiza una solicitud POST a la API de OpenAI
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
        },
		

        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        var reply = data.choices[0].text;
        appendMessage('ChatGPT', reply);
    })
    .catch(error => {
        console.error('Error al obtener respuesta de ChatGPT:', error);
        appendMessage('ChatGPT', 'Lo siento, ha ocurrido un error.');
    });
	}