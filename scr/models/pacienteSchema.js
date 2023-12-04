const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    correo:{
        type: String,
        required: false
    },
    estatusCliente:{
        type: String,
        enum: ['Activo', 'Inactivo']
    },
    password:{
        type: String,
        required: true
    },
    citas:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cita'}]
    
});

const Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;
