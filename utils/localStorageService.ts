export const KEYS = {
  USER_ID: 'userId',
};

export const getLS = (key: string) => {
  return localStorage.getItem(key);
};

export const setLS = <T>(key: string, value: T) => {
  if (key) {
    if (typeof value !== 'string') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }
};

export const removeLS = (key: string) => {
  if (key) {
    localStorage.removeItem(key);
  }
};
