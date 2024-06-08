async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000, controller = new AbortController() } = options;

  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);

  return response;
}

export default fetchWithTimeout;