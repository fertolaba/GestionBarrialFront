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

			const json = await response.json();

			console.log(json)
			return json;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	getReclamosByLegajo = async (legajo) => {
		const url = `${this._apiUrl}/legajo/${legajo}`;
		try {
			const response = await fetchWithTimeout(url);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const json = await response.json();

			console.log(json)
			return json;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	saveReclamo = async (reclamo) => {
		const response = {
			status: 500,
			message: {
				title: 'Error',
				description: 'Hubo un error al generar el reclamo, por favor intenta nuevamente',
			},
			reclamo: null,
		}

		try {
			const respuesta = await fetchWithTimeout(this._apiUrl, {
				timeout: 60 * 1000, // 60 segundos
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reclamo),
			})

			if (respuesta.status === 400) {
				response.status = 400;
				response.message = {
					description: 'No se pudo generar el reclamo, por favor verifica los datos ingresados',
				}
			}

			if (respuesta.status === 201) {
				response.status = 201;
				response.message = {
					title: 'Reclamo generado',
					description: 'Tu reclamo ha sido generado con éxito',
				}
				response.reclamo = await respuesta.json();
			}

			return response;
		} catch (error) {
			console.error('Error fetching data:', error);

			return false;
		}
	};

	actualizarEstadoReclamo = async (reclamo, estado, legajo) => {
		const url = `${this._apiUrl}/actualizarEstado`;
		const response = {
			status: 500,
			message: {
				title: 'Error',
				description: 'Hubo un error al actualizar el estado del reclamo, por favor intenta nuevamente',
			},
			reclamo: null,
		}

		try {
			const respuesta = await fetchWithTimeout(url, {
				timeout: 30 * 1000, // 30 segundos
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ estado, reclamo, legajo }),
			})

			if (respuesta.status === 400) {
				response.status = 400;
				response.message = {
					description: 'No se pudo actualizar el estado del reclamo, por favor verifica los datos ingresados',
				}
			}

			if (respuesta.status === 200) {
				response.status = 200;
				response.message = {
					title: 'Reclamo actualizado',
					description: 'El estado del reclamo ha sido actualizado con éxito',
				}
				response.reclamo = await respuesta.json();
			}

			console.log(response)

			return response;
		} catch (error) {
			console.error('Error fetching data:', error);

			return false;
		}
	}
}

const reclamosServices = new ReclamosServices();
export default reclamosServices.getInstance();