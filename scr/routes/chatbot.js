
function getInitialMessage() {
    return "Hola, soy tu Chatbot. Por favor, elige una opción:\n" +
           "1. Como se agenda una cita.\n" +
           "2. Como modifico una cita.\n" +
           "3. No me aparecen ninguna nota después de agendar una cita.\n" +
           "4. ¿Puedo cancelar una o más citas?.\n" +
           "5. ¡Puse información errónea! ¿Qué hago.";
}

function processMessage(userInput) {

    switch (userInput.toString()) {
        case '1':
            return "a.";
        case '2':
            return "a.";
        case '3':
            return "a.";
        case '4':
            return "a.";
        case '5':
            return "a.";
        default:
            return "Lo siento, no entendí eso. Por favor, elige una opción entre 1 y 5.";
    }
}

module.exports = { getInitialMessage, processMessage };
