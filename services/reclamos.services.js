import { API_BASE_URL } from "../constants/constants";
import fetchWithTimeout from "./_fetchWithTimeout";

class ReclamosServices {
	_instance = null;
	_apiUrl = API_BASE_URL + '/reclamos';


	getInstance() {
		if (!this._instance) {
			this._instance = new ReclamosServices();
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


	getReclamos = async () => {
		console.warn(this._apiUrl)

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

	saveReclamo = async (reclamo) => {
		try {
			const response = await fetchWithTimeout(this._apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reclamo),
			})

			console.warn(response)
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

const reclamosServices = new ReclamosServices();
export default reclamosServices.getInstance();