import { API_BASE_URL } from "../constants/constants";
import { exists } from "../utils/misc";
import fetchWithTimeout from "./_fetchWithTimeout";

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

    return []
  };

  getSitioById = async (id) => {
    const url = `${this._apiUrl}/id/${id}`;
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

  saveSitio = async (sitio, user) => {
    const sitioConDueno = exists(sitio?.documento);

    try {
      const response = await fetchWithTimeout(_apiUrl, {
        method: sitioConDueno ? "PUT" : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sitio,
          documento: user.documento
        }),
      })

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