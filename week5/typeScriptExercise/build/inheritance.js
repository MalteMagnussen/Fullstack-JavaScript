"use strict";
class Shape {
    constructor(color) {
        this.toString = () => {
            return `Color: ${this._color}\nArea: ${this.area}\nPerimeter: ${this.perimeter}`;
        };
        this._color = color;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
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
    constructor(color, radius) {
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
    set radius(radius) {
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
    constructor(color, radius, height) {
        super(color, radius);
        this.toString = () => {
            return `\nArea of Cylinder is: ${this.area} \nand the height is: ${this._height}, \nand the volume is: ${this.volume}`;
        };
        this._height = height;
    }
    // Surface area in this case.
    get area() {
        return (2 * Math.PI * this.radius * this._height +
            2 * Math.PI * this.radius * this.radius);
    }
    get perimeter() {
        throw new Error("Method not implemented.");
    }
    get volume() {
        return Math.PI * this.radius * this.radius * this._height;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
}
let myCylinder = new Cylinder("red", 5, 10);
console.log(myCylinder.toString());
myCylinder.height = 20;
console.log(myCylinder.toString());
myCylinder.radius = 10;
console.log(myCylinder.toString());
//# sourceMappingURL=inheritance.js.map