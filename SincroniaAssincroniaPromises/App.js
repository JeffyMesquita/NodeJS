var fs = require('fs');

/*console.time('Assincrono');
var counter = 0;

for(var i = 0; i < 1000; i++) {
  fs.readFile('my_file.txt', (err, data) => {
    if(err){
      return console.error(err);
    }
    counter++;
    console.log("Assincrono: " + data.toString());
    if(counter === 1000) {
      console.timeEnd('Assincrono');
    }
  });
}*/ // 6131.450ms

/*console.time('Sincrono');
for(var i = 0; i < 1000; i++){
  var data = fs.readFileSync('my_file.txt');
  console.log("Sincrono: " + data);
}
console.timeEnd('Sincrono');*/ //6374.443ms

Promise = require('promise');

function read(file) {
  return new Promise((fullfill, reject) => {
    fs.readFile(file, (err, data) => {
      if(err) {
        reject();
      }else {
        fullfill(data.toString());
      }
    });
  });
}

/*read('my_file.txt')
.then((data) => {
  console.log(data);
  return '111111';
})
.then((data) => {
  console.log(data);
  return '222222';
})
.then((data) => {
  console.log(data);
  return '333333';
})
.done((data) => {
  console.log(data);
});*/

read('my_file.txt', (data1, callback1) => {
  console.log(data);
  callback1('111111', (data2, callback2) => {
    console.log(data2);
    callback2('222222', (data3, callback3) => {
      console.log(data3);
      callback3('333333', () => {
        console.log(data4);
      });
    });
  });
});