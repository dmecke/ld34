Vector = require('./Math/Vector.js');

LevelDefinitions = [
    { level: 1, position: new Vector(300, 300), winningConditions: { mass: 50 }},
    { level: 2, position: new Vector(500, 300), winningConditions: { mass: 70 }}
];

module.exports = LevelDefinitions;
