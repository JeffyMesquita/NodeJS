var fs = require('fs');

/*fs.writeFile('my_file.txt', 'Treina Web', (err)=> { // cria um arquivo
  if(err){
    console.error(err);
  }
  console.log('Arquivo Criado!');
});*/

/*fs.readFile('my_file.txt', (err, data)=> { // faz a leitura de um arquivo
  if(err){
    console.error(err);
  }
  console.log(data.toString());
});*/

/*fs.appendFile('my_file.txt', ' Treina Web', (err) => { //Escreve em                 arquivo ja Existente de onde havia parado
  if(err){
    console.error(err);
  }
  console.log('Arquivo Sobrescrito');
});*/

var data = fs.readFileSync('my_file.txt');
console.log(data.toString());// Semelhante ao 'ReadFile' só que de maneira Sincrona

