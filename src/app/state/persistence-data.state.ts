
export function checkItemExistInLocalStorage(action: string): any {
  let auxItem = JSON.parse(localStorage.getItem(action) ?? JSON.stringify(''));
  if (auxItem) {
    return auxItem;
  } else {
    return { loading: false, products: [] }
  }
}

export function addItemToLocalStorage(action: string, data: any): any {
  localStorage.setItem(
    action,
    JSON.stringify(data)
  );
}
