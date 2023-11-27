// fetching all the products
export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  }
  );
}

// fetch single product
export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/products/' + id);
      const data = await response.json();
      // console.log(data[0])
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  }
  );
}

// fetch products when filter is applied
export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category": "jewelery"}
  // sort = {_sort: "price", _order: "desc"}
  let queryString = '' // initializing empty query string
  for (let key in filter) { // adding filter to query
    queryString += `${key}=${filter[key]}&`
  }

  for (let key in sort) { // adding sort option to query
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) { // adding pagination to query
    queryString += `${key}=${pagination[key]}&`
  }

  queryString = queryString.slice(0, -1); // removing the last & in the query string

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/products?' + queryString);
      const data = await response.json();
      const totalItems = await response.headers.get('X-Total-Count');
      resolve({ data: { products: data, totalItems: totalItems } });
    } catch (error) {
      reject(error);
    }
  }
  );
}