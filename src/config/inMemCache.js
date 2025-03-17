/**
 * Persistent cache implementation for API requests
 * Uses both memory and localStorage for persistence
 */

const CACHE_PREFIX = 'buffered-reader-cache:';
const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// In-memory cache
const memoryCache = new Map();

/**
 * Get a value from the cache (checks both memory and localStorage)
 */
const get = (key) => {
  const cacheKey = `${CACHE_PREFIX}${key}`;
  
  // Try memory cache first
  if (memoryCache.has(key)) {
    const { value, expiry } = memoryCache.get(key);
    
    if (expiry && Date.now() > expiry) {
      memoryCache.delete(key);
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return value;
  }
  
  // Try localStorage
  try {
    const storedItem = localStorage.getItem(cacheKey);
    if (!storedItem) return null;
    
    const { value, expiry } = JSON.parse(storedItem);
    
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    // Add to memory cache for faster subsequent access
    memoryCache.set(key, { value, expiry });
    return value;
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
};

/**
 * Set a value in both memory cache and localStorage
 */
const set = (key, value, ttl = DEFAULT_CACHE_TTL) => {
  const expiry = ttl ? Date.now() + ttl : null;
  const cacheItem = { value, expiry };
  
  // Set in memory
  memoryCache.set(key, cacheItem);
  
  // Set in localStorage
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
  } catch (error) {
    console.error('Cache storage error:', error);
  }
};

/**
 * Clear cache entries
 */
const clear = (keyPattern) => {
  if (!keyPattern) {
    // Clear all
    memoryCache.clear();
    
    // Clear localStorage (only our entries)
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  } else {
    // Clear specific pattern
    const pattern = new RegExp(keyPattern.replace('*', '.*'));
    
    // Clear from memory
    memoryCache.forEach((_, key) => {
      if (pattern.test(key)) {
        memoryCache.delete(key);
      }
    });
    
    // Clear from localStorage
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          const actualKey = key.substring(CACHE_PREFIX.length);
          if (pattern.test(actualKey)) {
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Cache pattern clear error:', error);
    }
  }
};

export default {
  get,
  set,
  clear,
};