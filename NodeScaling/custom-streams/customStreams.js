


class Lion {
	constructor(name, size) {
		this.animal = name;
		this.habitat = size;
	}
	lionking = "king of jungle";
	fearless() {
		return `iam fearless`;
	}
}

class Cub extends Lion {
  constructor(name,size){
    super(name,size)
  }
	playing() {
		return ` the little cub plays often witht he parent`;
	}
}

const newCub = new Cub("cub", "littleland");

newCub;

console.log(newCub);
console.log(newCub.fearless());