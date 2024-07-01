import { API_BASE_URL } from "../constants/constants";
import fetchWithTimeout from "./_fetchWithTimeout";

class UsuarioService {
  _instance = null;
  _apiUrl = API_BASE_URL + '/auth';


  getInstance() {
    if (!this._instance) {
      this._instance = new UsuarioService();
    }
    return this._instance;
  }

  altaUsuario = async (documento, mail, aceptado = true) => {
    const url = `${this._apiUrl}/nuevo`;
    const response = {
      status: 500,
      message: {
        title: 'Error',
        description: 'Hubo un error al dar de alta el usuario',
      },
    }

    try {
      const fetchResponse = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documento, mail, aceptado }),
      })

      response.status = fetchResponse.status;

      if (response.status === 200) {
        response.message.title = 'Éxito';
        response.message.description = 'Se de dio de alta el usuario correctamente, inicia sesion de nuevo para continuar';
      }
    } catch (error) {
      response.message.title = 'Error inesperado';
      response.message.description = 'Hubo un error al cambiar la contraseña, por favor intenta nuevamente';

      console.error('Error fetching data:', error);
    }

    return response
  }

  login = async (credentials) => {
    const url = `${this._apiUrl}/login`;

    try {
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  updatePassword = async ({ documento, ...otrosDatos }) => {
    const url = `${this._apiUrl}/cambiarcontrasena/${documento}`;
    const response = {
      status: 500,
      message: {
        title: 'Error',
        description: 'Hubo un error al cambiar la contraseña, por favor intenta nuevamente',
      },
    }

    try {
      const fetchResponse = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otrosDatos),
      })

      response.status = fetchResponse.status;
      response.fetchResponse = fetchResponse;

      if (response.status === 200) {
        response.message.title = 'Éxito';
        response.message.description = 'Se cambio la contraseña correctamente, inicia sesion de nuevo para continuar';
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return response
  };
}

const usuarioService = new UsuarioService();
export default usuarioService.getInstance();