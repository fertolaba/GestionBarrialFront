// const BASE_URL = 'http://localhost:3000';
// const API_URL = BASE_URL + '/api/denuncias';

import { generatePlaceholderImage } from "../utils/images";
import { generateInteger } from "../utils/numbers";


const estados = [
  "pendiente",
  "revision",
  "actualizado",
  "rechazada",
  "cerrado",
]


let denunciasLength = 10;
const denunciasTest = Array.from({ length: denunciasLength }, (_, i) => i + 1).map((i) => ({
  id: i,
  tipo: `Tipo ${generateInteger(1, 4)}`,
  descripcion: `descripcion ${i}`,
  imageSource: generatePlaceholderImage(),
  estado: estados[generateInteger(0, estados.length - 1)],
}))

class DenunciasService {
  _instance = null;

  getInstance() {
    if (!this._instance) {
      this._instance = new DenunciasService();
    }
    return this._instance;
  }


  getDenuncias = async () => {
    try {
      return await new Promise((res, rej) => {
        setTimeout(() => {
          res(denunciasTest);
        }, 500);

        setTimeout(() => {
          rej(`TIMEOUT`);
        }, 5000);
      })
    } catch (error) {
      console.log(`Error obteniendo denuncias ${error}`);
    }
    return []
  }

  getDenunciaById = async (id) => {
    try {
      const response = await getDenuncia();
      return response.find(denuncia => denuncia.id === id);
    } catch (error) {
      console.error(error);
    }
  }
}

const denunciasService = new DenunciasService();
export default denunciasService.getInstance();