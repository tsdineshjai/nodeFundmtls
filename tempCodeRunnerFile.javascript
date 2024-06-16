

function* generator(i){

  yield i;

  yield i*3;
}

generator(21)

console.log(generator.next().value)
console.log(generator.next().value)