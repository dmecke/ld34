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
            cells: 5
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
        intro: 'Time ran out, so no new cell types here? Well then, at least the red ones are back, and they are huge! Try to grow to 100 before they hit you!',
        winningConditions:
        {
            mass: 100
        },
        setup:
        {
            numberOfCells: 25,
            cells: [
                {
                    mass: 100,
                    type: settings.CELL_TYPE_ABSORB
                },
                {
                    mass: 100,
                    type: settings.CELL_TYPE_ABSORB
                },
                {
                    mass: 100,
                    type: settings.CELL_TYPE_ABSORB
                }
            ]
        }
    },
    {
        level: 8,
        position: new Vector(400, 490),
        intro: 'Are you clever enough to catch the escaping cells without colliding with the red ones too often? Grow to at least 75.',
        winningConditions:
        {
            mass: 75
        },
        setup:
        {
            numberOfCells: 22,
            cells: [
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(100, 100),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(400, 100),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(700, 100),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(100, 300),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(700, 300),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(100, 500),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(400, 500),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(700, 500),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(250, 200),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(550, 200),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(250, 400),
                    velocity: new Vector(0, 0)
                },
                {
                    mass: 25,
                    type: settings.CELL_TYPE_ABSORB,
                    position: new Vector(550, 400),
                    velocity: new Vector(0, 0)
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
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                }
            ]
        }
    },
    {
        level: 9,
        position: new Vector(550, 490),
        intro: 'Lets throw in what we\'ve got! How huge can you grow? (Hint: really huge..)',
        winningConditions:
        {
            cells: 30
        },
        setup:
        {
            numberOfCells: 30,
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
                },
                {
                    type: settings.CELL_TYPE_ESCAPER
                }
            ]
        }
    },
    {
        level: 10,
        position: new Vector(700, 490),
        intro: 'Ok, that was too easy, right? So this time we have some red ones in here as well. Can you collect everything (including your emitted mass) and don\'t get hit by any red one? (That\'s really tough..)',
        winningConditions:
        {
            mass: 110
        },
        setup:
        {
            numberOfCells: 15,
            cells: [
                {
                    type: settings.CELL_TYPE_SIMPLE,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_SIMPLE,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_SIMPLE,
                    mass: 10
                },
                {
                    type: settings.CELL_TYPE_SIMPLE,
                    mass: 10
                },
                {
                    type: settings.CELL_TYPE_ESCAPER,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_ESCAPER,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_ESCAPER,
                    mass: 10
                },
                {
                    type: settings.CELL_TYPE_ESCAPER,
                    mass: 10
                },
                {
                    type: settings.CELL_TYPE_DIRECTION,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_DIRECTION,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_DIRECTION,
                    mass: 10
                },
                {
                    type: settings.CELL_TYPE_DIRECTION,
                    mass: 10
                },
                {
                    type: settings.CELL_TYPE_ABSORB,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_ABSORB,
                    mass: 5
                },
                {
                    type: settings.CELL_TYPE_ABSORB,
                    mass: 5
                }
            ]
        }
    }
];

module.exports = LevelDefinitions;
