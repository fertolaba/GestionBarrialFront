let BASE_URL = 'http://10.0.2.2:8080';
//  BASE_URL = 'localhost:8080/';

const API_URL = BASE_URL + '/api/sitios';


class SitiosServices {
  _instance = null;

  getInstance() {
    if (!this._instance) {
      this._instance = new SitiosServices();
    }
    return this._instance;
  }


  getSitios = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  getSitioByDocumento = async (documento) => {
    const url = `${API_URL}/documento/${documento}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
}

const sitioServices = new SitiosServices();
export default sitioServices.getInstance();