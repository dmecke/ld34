Vector = require('./Math/Vector.js');

LevelDefinitions = [
    { level: 1, position: new Vector(100, 340), winningConditions: { mass: 50 }},
    { level: 2, position: new Vector(250, 340), winningConditions: { mass: 60 }},
    { level: 3, position: new Vector(400, 340), winningConditions: { mass: 70 }},
    { level: 4, position: new Vector(550, 340), winningConditions: { mass: 80 }},
    { level: 5, position: new Vector(700, 340), winningConditions: { mass: 90 }},
    { level: 6, position: new Vector(100, 490), winningConditions: { mass: 100 }},
    { level: 7, position: new Vector(250, 490), winningConditions: { mass: 110 }},
    { level: 8, position: new Vector(400, 490), winningConditions: { mass: 120 }},
    { level: 9, position: new Vector(550, 490), winningConditions: { mass: 130 }},
    { level: 10, position: new Vector(700, 490), winningConditions: { mass: 140 }}
];

module.exports = LevelDefinitions;
