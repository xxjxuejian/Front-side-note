function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, ms);
  });
}

delay(3000).then((data) => console.log(data));
