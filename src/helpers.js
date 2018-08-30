export const shuffle = arra1 => {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
};

export const fetchData = async (url, options) => {
  let cacheKey = url;
  let cached = sessionStorage.getItem(cacheKey);
  if (cached !== null) {
    let response = new Response(new Blob([cached]));
    return Promise.resolve(response);
  }

  let response = await (await fetch(url)).json();
  if (response.status === 200) {
    let ct = response.headers.get('Content-Type');
    if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
      let content = await response.clone().text();
      sessionStorage.setItem(cacheKey, content);
    }
  }
  return response;
};
