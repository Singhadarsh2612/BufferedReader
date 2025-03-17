import cache from '../config/inMemCache';

/**
 * Cached version of the fetch API
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {Object} cacheOptions - Caching options
 * @param {boolean} cacheOptions.useCache - Whether to use cache (default: true)
 * @param {number} cacheOptions.ttl - Cache TTL in ms (default: 5 minutes)
 * @returns {Promise<any>} - Fetch response
 */
const cachedFetch = async (url, options = {}, cacheOptions = {}) => {
  const {
    useCache = true,
    ttl = undefined,  // Use default from cacheUtils
  } = cacheOptions;

  // Generate a cache key based on URL and options
  const cacheKey = `fetch:${url}:${JSON.stringify(options)}`;
  
  // Check cache if enabled
  if (useCache) {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      console.log(`Cache hit for: ${url}`);
      return cachedResponse;
    }
  }
  
  // If not in cache or cache disabled, perform the fetch
  console.log(`Cache miss for: ${url}, fetching...`);
  const response = await fetch(url, options);
  
  // Clone the response as reading the body consumes it
  const responseClone = response.clone();
  const data = await response.json();
  
  // Cache the response if caching is enabled
  if (useCache && response.ok) {
    cache.set(cacheKey, data, ttl);
  }
  
  return data;
};

export default cachedFetch;