function getInitialMessage() {
    return "Hola, soy tu Chatbot. Por favor, elige una opción:\n" +
           "1. Como se agenda una cita." +
           "2. Como modifico una cita." +
           "3. No me aparecen ninguna nota después de agendar una cita." +
           "4. ¿Puedo cancelar una o más citas?." +
           "5. ¡Puse información errónea! ¿Qué hago.";
}

function processMessage(userInput) {
    let response;

    switch (userInput.toString()) {
        case '1':
            response = "Para Agendar una cita debes de ir a Perfil, darle boton al icono de calendario ahi podras ingresar los datos de la cita.";
            break;
        case '2':
            response = "Para modificar una cita, en Perfil veras tus citas actuales y veras un lapiz para editar dale ahi en la cita que desees editar.";
            break;
        case '3':
            response = "No te preocupes esto es normal, te apareceran las notas hasta que despues de tu cita, pero OJO solo veras la nota de la ultima cita.";
            break;
        case '4':
            response = "Si, si puedes en perfil veras un boton de menos en cada cita que tengas, dale Click ahi y podras eliminar la cita.";
            break;
        case '5':
            response = "Tranquilo, podras editar tu cita Siempre y cuando la Cita no este confirmada, Si es el caso que aun no esta confirmada sigue los pasos de la pregunta 2.";
            break;
        default:
            response = "Lo siento, no entendí eso. Por favor, elige una opción entre 1 y 5.";
            break;
    }

    return response + "\n\n¿Te puedo ayudar en otra cosa? Elige una opción:\n" +
           "1. Como se agenda una cita.\n" +
           "2. Como modifico una cita.\n" +
           "3. No me aparecen ninguna nota después de agendar una cita.\n" +
           "4. ¿Puedo cancelar una o más citas?.\n" +
           "5. ¡Puse información errónea! ¿Qué hago.";
}

module.exports = { getInitialMessage, processMessage };
