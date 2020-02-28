abstract class Shape {
  private _color: string;
  constructor(color: string) {
    this._color = color;
  }
  abstract get area(): number;
  abstract get perimeter(): number;
  get color() {
    return this._color;
  }
  set color(color: string) {
    this._color = color;
  }
  toString = () => {
    return `Color: ${this._color}\nArea: ${this.area}\nPerimeter: ${this.perimeter}`;
  };
}

// myShape = new Shape(); // Cannot create instance of abstract class
/* 
B) Create a new class Circle that should extend the Shape class.
Provide the class with:
A radius field
A constructor that takes both colour and radius.
Overwritten versions of the methods defined in the Base
Getter/Setter for radius
Test the class constructor, the getters/setters and the three methods.

*/
class Circle extends Shape {
  private _radius: number;
  constructor(color: string, radius: number) {
    super(color);
    this._radius = radius;
  }
  get area() {
    return Math.pow(this._radius, 2) * Math.PI;
  }
  get perimeter() {
    return Math.PI * this._radius * 2;
  }
  get radius() {
    return this._radius;
  }
  set radius(radius: number) {
    this._radius = radius;
  }
}

let myCircle = new Circle("red", 10);

console.log(myCircle.toString());

myCircle.radius = 20;

console.log(myCircle.toString());

/**
 * C) Create a new class Cylinder (agreed, definitely not a perfect inheritance example) that should extend the Circle class.
Provide the class with:
A height field
A constructor that takes colour, radius and height.
Overwritten versions of relevant methods defined in the Base (getter for perimeter should throw "not implemented")
A getVolume() method  (or better, a getter called volume)
Getter/Setter for height
Test the new class

 */

class Cylinder extends Circle {
  private _height: number;
  // Surface area in this case.
  get area(): number {
    return (
      2 * Math.PI * this.radius * this._height +
      2 * Math.PI * this.radius * this.radius
    );
  }
  get perimeter(): number {
    throw new Error("Method not implemented.");
  }
  get volume(): number {
    return Math.PI * this.radius * this.radius * this._height;
  }
  constructor(color: string, radius: number, height: number) {
    super(color, radius);
    this._height = height;
  }
  get height() {
    return this._height;
  }
  set height(height: number) {
    this._height = height;
  }
}
