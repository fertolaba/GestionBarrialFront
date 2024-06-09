import fetchWithTimeout from "./_fetchWithTimeout";

let API_BASE_URL = 'http://10.0.2.2:8080/api';
//  BASE_URL = 'localhost:8080/';

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