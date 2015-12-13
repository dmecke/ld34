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
        intro: 'There can be multiple cells and they are moving! Your mass cannot go below a certain level, but you won\'t be able to move anymore. Collect all green cells!',
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
        intro: 'Be aware of the red cells - they withdraw some mass! Grow up to 100 mass anyway!',
        winningConditions:
        {
            mass: 100
        },
        setup:
        {
            numberOfCells: 15,
            cells: [
                {
                    mass: 5,
                    type: settings.CELL_TYPE_ABSORB
                },
                {
                    mass: 10,
                    type: settings.CELL_TYPE_ABSORB
                },
                {
                    mass: 20,
                    type: settings.CELL_TYPE_ABSORB
                },
                {
                    mass: 10,
                    type: settings.CELL_TYPE_ABSORB
                },
                {
                    mass: 15,
                    type: settings.CELL_TYPE_ABSORB
                }
            ]
        }
    },
    {
        level: 4,
        position: new Vector(550, 340),
        intro: 'Uh oh! Yellow cells randomly change their directions. Can you still collect them all?',
        winningConditions:
        {
            cells: 10
        },
        setup:
        {
            numberOfCells: 5,
            cells: [
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                }
            ]
        }
    },
    {
        level: 5,
        position: new Vector(700, 340),
        intro: 'Uhm.. It seems we are in the wrong theme now.. The mouse won\'t work here, you can only use A and D to steer. Can you collect all cells even with two button controls?',
        winningConditions:
        {
            cells: 10
        },
        setup:
        {
            numberOfCells: 10,
            cells: [
                {
                    type: settings.CELL_TYPE_SIMPLE
                },
                {
                    type: settings.CELL_TYPE_SIMPLE
                },
                {
                    type: settings.CELL_TYPE_SIMPLE
                },
                {
                    type: settings.CELL_TYPE_SIMPLE
                },
                {
                    type: settings.CELL_TYPE_SIMPLE
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                },
                {
                    type: settings.CELL_TYPE_DIRECTION
                }
            ]
        }
    },
    {
        level: 6,
        position: new Vector(100, 490),
        intro: 'Back to normal now. But wait! These purple ones seem to flee! Can you catch them?',
        winningConditions:
        {
            cells: 10
        },
        setup:
        {
            cells: [
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                }
            ]
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
