// Code goes here
const uuidv4 = require("uuid/v4") // npm install uuid

function Recipe(){
    this.id = uuidv4() //creates a univerally unique identifer like "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
    this.image = new Image(); //creates an empty image object
    this.video = null // possibly new Video();
    this.caption = "null"
    this.calories = 0
}
