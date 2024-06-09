import fetchWithTimeout from "./_fetchWithTimeout";

let API_BASE_URL = 'http://10.0.2.2:8080/api';
//  BASE_URL = 'localhost:8080/';

class SitiosServices {
  _instance = null;
  _apiUrl = API_BASE_URL + '/sitios';


  getInstance() {
    if (!this._instance) {
      this._instance = new SitiosServices();
    }
    return this._instance;
  }


  getSitios = async () => {
    try {
      const response = await fetchWithTimeout(this._apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  getSitioByDocumento = async (documento) => {
    const url = `${this._apiUrl}/documento/${documento}`;
    try {
      const response = await fetchWithTimeout(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  saveSitio = async (sitio, isUpdate) => {
    const url = `${this._apiUrl}/${isUpdate ? "editar" : "crear"}`;
    console.info({ sitio })
    try {
      const response = await fetchWithTimeout(url, {
        method: isUpdate ? "PUT" : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sitio),
      })
      console.warn({ response })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      
      return false;
    }
  };
}

const sitioServices = new SitiosServices();
export default sitioServices.getInstance();