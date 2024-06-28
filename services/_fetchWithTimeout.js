async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000, controller = new AbortController() } = options;

  const id = setTimeout(() => controller.abort(`Timeout: La petición excedió los ${timeout/1000} segundos de espera.`), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);

  return response;
}

export default fetchWithTimeout;