export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

export function setToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key) {
  const storageData = localStorage.getItem(key);
  return JSON.parse(storageData);
}

export function updateStorageDataByFilter(key, operandItemThatBeingFiltered) {
  const data = getFromStorage(key);
}