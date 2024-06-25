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
}

const usuarioService = new UsuarioService();
export default usuarioService.getInstance();