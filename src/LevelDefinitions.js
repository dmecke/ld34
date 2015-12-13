Vector = require('./Math/Vector.js');
settings = require('./Settings.js');

LevelDefinitions = [
    {
        level: 1,
        position: new Vector(100, 340),
        intro: 'You are the blue cell in the middle. Click left to it to emit some mass and you will move right. Absorb the green cell by moving over it!',
        winningConditions:
        {
            cells: 1
        },
        setup:
        {
            numberOfCells: 1,
            cells: [
                {
                    position: new Vector(500, 300),
                    velocity: new Vector(0, 0),
                    mass: 10,
                    type: settings.CELL_TYPE_SIMPLE
                }
            ]
        }
    },
    {
        level: 2,
        position: new Vector(250, 340),
        intro: 'There can be multiple cells and they are moving! Don\'t be afraid to lose mass - you cannot go below a certain level. Collect all green cells!',
        winningConditions:
        {
            cells: 5
        },
        setup:
        {
            numberOfCells: 5
        }
    },
    {
        level: 3,
        position: new Vector(400, 340),
        intro: 'Collect 70 mass!',
        winningConditions:
        {
            mass: 70
        }
    },
    {
        level: 4,
        position: new Vector(550, 340),
        intro: 'Collect 80 mass!',
        winningConditions:
        {
            mass: 80
        }
    },
    {
        level: 5,
        position: new Vector(700, 340),
        intro: 'Collect 90 mass!',
        winningConditions:
        {
            mass: 90
        }
    },
    {
        level: 6,
        position: new Vector(100, 490),
        intro: 'Collect 100 mass!',
        winningConditions:
        {
            mass: 100
        }
    },
    {
        level: 7,
        position: new Vector(250, 490),
        intro: 'Collect 0 mass!',
        winningConditions:
        {
            mass: 110
        }
    },
    {
        level: 8,
        position: new Vector(400, 490),
        intro: 'Collect 120 mass!',
        winningConditions:
        {
            mass: 120
        }
    },
    {
        level: 9,
        position: new Vector(550, 490),
        intro: 'Collect 130 mass!',
        winningConditions:
        {
            mass: 130
        }
    },
    {
        level: 10,
        position: new Vector(700, 490),
        intro: 'Collect 140 mass!',
        winningConditions:
        {
            mass: 140
        }
    }
];

module.exports = LevelDefinitions;
