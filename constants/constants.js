let API_BASE_URL = 'http://10.0.2.2:8080/api'; // emulator
//API_BASE_URL = 'http://localhost:8080/api'; // web - para usar en emulador, comentar esta linea


const RECLAMOS = {
    MAXFILES: {
        "vecino": 7,
        default: Infinity
    }
}

export {
    API_BASE_URL,
    RECLAMOS,
}