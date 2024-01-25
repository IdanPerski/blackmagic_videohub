export class Source {
  constructor(sourceName, number, routedTo) {
    this.sourceName = sourceName;
    this.number = number;
    this.routedTo = [];
  }

  set source(name) {
    this.sourceName = name;
  }

  get source() {
    return this;
  }

  addSourceToDestenation(numberOfNewDst) {
    console.log(numberOfNewDst, "))))))))))(((((((((((((");
    if (this.routedTo.includes(numberOfNewDst)) {
      console.log("This source is already exists");
    } else {
      this.routedTo.push(numberOfNewDst);
    }
  }
}

export class Destenation {
  constructor(dstName, number, sourceRouted) {
    this.dstName = dstName;
    this.number = number;
    this.sourceRouted = sourceRouted;
  }
  set destenation(name) {
    this.dstName = name;
  }

  get destenation() {
    return this;
  }

  addNewSrcRouted(source) {
    this.sourceRouted = source;
  }
}
