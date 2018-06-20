const shuffle = arra1 => {
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

export const handleData = async () => {
  let allEmployees = await (await fetch(
    "https://willowtreeapps.com/api/v1.0/profiles"
  )).json();
  let sixRandomEmployees = shuffle(allEmployees)
    .slice(0, 6)
    .map(element => {
      return [element, element];
    })
    .reduce((acc, val) => acc.concat(val), []);
  return shuffle(sixRandomEmployees);
};
