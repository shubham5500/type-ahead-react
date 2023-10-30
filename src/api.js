export async function getProducts(query) {
  let queryStr = "";
  if (query) {
    queryStr = queryStr + `/search?q=${query}`;
  }
  const res = await fetch(`https://dummyjson.com/products${queryStr}`);
  const data = await res.json();
  return data;
}
