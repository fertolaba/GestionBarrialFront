import { API_BASE_URL } from "../constants/constants";
import fetchWithTimeout from "./_fetchWithTimeout";

class NotificacionServices {
    _instance = null;
    _apiUrl = API_BASE_URL + '/notificaciones';


    getInstance() {
        if (!this._instance) {
            this._instance = new NotificacionServices();
        }
        return this._instance;
    }

    getReclamo = async (id) => {
        const url = `${this._apiUrl}/${id}`;
        try {
            const response = await fetchWithTimeout(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error
            );
        }
    };

    getReclamosByDocumento = async (documento) => {
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

}

const notificationServices = new NotificacionServices();
export default notificationServices.getInstance();