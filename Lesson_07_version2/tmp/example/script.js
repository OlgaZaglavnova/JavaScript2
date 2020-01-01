const fs = require('fs');

fs.readFile('./data.json', 'utf-8', (err, data) => {
  if (!err) {
    const obj = JSON.parse(data);
    obj.isActive = true;

    fs.writeFile('./data.json', JSON.stringify(obj), (err) => {
      console.error(err)
    })
  }
});
