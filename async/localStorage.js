export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

export function overwriteStorageData(key, data) {
  removeFromStorage(key);
  setToStorage(key, data);
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

  if (data && data.users) {
    data.users = data.users.filter(dataItem => dataItem.id !== String(operandItemThatBeingFiltered));

    overwriteStorageData(key, data);
  }
}