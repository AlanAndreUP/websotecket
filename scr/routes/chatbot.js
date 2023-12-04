
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
            return "Para Agendar una cita debes de ir a Perfil, darle boton al icono de calendario ahi podras ingresar los datos de la cita.";
        case '2':
            return "Para modificar una cita, en Perfil veras tus citas actuales y veras un lapiz para editar dale ahi en la cita que desees editar.";
        case '3':
            return "No te preocupes esto es normal, te apareceran las notas hasta que despues de tu cita, pero OJO solo veras la nota de la ultima cita.";
        case '4':
            return "Si, si puedes en perfil veras un boton de menos en cada cita que tengas, dale Click ahi y podras eliminar la cita .";
        case '5':
            return "Tranquilo, podras editar tu cita Siempre y cuando la Cita no este confirmada, Si es el caso que aun no esta confirmada sigue los pasos de la pregunta 2.";
        default:
            return "Lo siento, no entendí eso. Por favor, elige una opción entre 1 y 5.";
    }
}

module.exports = { getInitialMessage, processMessage };
