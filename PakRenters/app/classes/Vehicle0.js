class Vehicle {
  constructor(
    postId,
    make,
    model,
    year,
    engine,
    seats,
    transmission,
    ac,
    absBrakes,
    cruise
  ) {
    this.postId = postId;
    this.make = make;
    this.model = model;
    this.year = year;
    this.engine = engine;
    this.cruise = cruise;
    this.seats = seats;
    this.transmission = transmission;
    this.AC = ac;
    this.absBrakes = absBrakes;
  }

  setImages(images) {
    this.images = images;
  }

  toString() {
    return `${this.make}`.concat(" " + `${this.model}`);
  }
}

export default Vehicle;
