const data = {
  recipes: [
    {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      lowFodmap: false,
      weightWatcherSmartPoints: 25,
      gaps: 'no',
      preparationMinutes: -1,
      cookingMinutes: -1,
      aggregateLikes: 9,
      healthScore: 1,
      creditsText: 'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
      license: 'CC BY 3.0',
      sourceName: 'Foodista',
      pricePerServing: 136.64,
      extendedIngredients: [
        {
          id: 9003,
          aisle: 'Produce',
          image: 'apple.jpg',
          consistency: 'SOLID',
          name: 'apples',
          nameClean: 'apple',
          original: '3 cups apples (4 large), pared and thinly sliced',
          originalName: 'apples (4 large), pared and thinly sliced',
          amount: 3,
          unit: 'cups',
          meta: [
            'thinly sliced',
            '(4 large)'
          ],
          measures: {
            us: {
              amount: 3,
              unitShort: 'cups',
              unitLong: 'cups'
            },
            metric: {
              amount: 709.764,
              unitShort: 'ml',
              unitLong: 'milliliters'
            }
          }
        },
        {
          id: 9003,
          aisle: 'Produce',
          image: 'apple.jpg',
          consistency: 'SOLID',
          name: 'apples',
          nameClean: 'apple',
          original: '10 cups apples, peeled, cored and diced',
          originalName: 'apples, peeled, cored and diced',
          amount: 10,
          unit: 'cups',
          meta: [
            'diced',
            'cored',
            'peeled'
          ],
          measures: {
            us: {
              amount: 10,
              unitShort: 'cups',
              unitLong: 'cups'
            },
            metric: {
              amount: 2.366,
              unitShort: 'l',
              unitLong: 'liters'
            }
          }
        },
        {
          id: 18064,
          aisle: 'Bakery/Bread',
          image: 'white-bread.jpg',
          consistency: 'SOLID',
          name: 'bread',
          nameClean: 'bread',
          original: '2 cups cubed homemade bread (no crusts)',
          originalName: 'cubed homemade bread (no crusts)',
          amount: 2,
          unit: 'cups',
          meta: [
            'homemade',
            'cubed',
            '(no crusts)'
          ],
          measures: {
            us: {
              amount: 2,
              unitShort: 'cups',
              unitLong: 'cups'
            },
            metric: {
              amount: 473.176,
              unitShort: 'ml',
              unitLong: 'milliliters'
            }
          }
        },
        {
          id: 1001,
          aisle: 'Milk, Eggs, Other Dairy',
          image: 'butter-sliced.jpg',
          consistency: 'SOLID',
          name: 'butter',
          nameClean: 'butter',
          original: '3/4 stick butter, melted',
          originalName: 'butter, melted',
          amount: 0.75,
          unit: 'stick',
          meta: [
            'melted'
          ],
          measures: {
            us: {
              amount: 0.75,
              unitShort: 'stick',
              unitLong: 'sticks'
            },
            metric: {
              amount: 0.75,
              unitShort: 'stick',
              unitLong: 'sticks'
            }
          }
        },
        {
          id: 1001,
          aisle: 'Milk, Eggs, Other Dairy',
          image: 'butter-sliced.jpg',
          consistency: 'SOLID',
          name: 'butter',
          nameClean: 'butter',
          original: '2 tablespoons melted butter',
          originalName: 'melted butter',
          amount: 2,
          unit: 'tablespoons',
          meta: [
            'melted'
          ],
          measures: {
            us: {
              amount: 2,
              unitShort: 'Tbsps',
              unitLong: 'Tbsps'
            },
            metric: {
              amount: 2,
              unitShort: 'Tbsps',
              unitLong: 'Tbsps'
            }
          }
        },
        {
          id: 1001,
          aisle: 'Milk, Eggs, Other Dairy',
          image: 'butter-sliced.jpg',
          consistency: 'SOLID',
          name: 'butter',
          nameClean: 'butter',
          original: '2 tablespoons butter, in small dots',
          originalName: 'butter, in small dots',
          amount: 2,
          unit: 'tablespoons',
          meta: [],
          measures: {
            us: {
              amount: 2,
              unitShort: 'Tbsps',
              unitLong: 'Tbsps'
            },
            metric: {
              amount: 2,
              unitShort: 'Tbsps',
              unitLong: 'Tbsps'
            }
          }
        },
        {
          id: 2010,
          aisle: 'Spices and Seasonings',
          image: 'cinnamon.jpg',
          consistency: 'SOLID',
          name: 'cinnamon',
          nameClean: 'cinnamon',
          original: '1/4 teaspoon cinnamon',
          originalName: 'cinnamon',
          amount: 0.25,
          unit: 'teaspoon',
          meta: [],
          measures: {
            us: {
              amount: 0.25,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            },
            metric: {
              amount: 0.25,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            }
          }
        },
        {
          id: 2010,
          aisle: 'Spices and Seasonings',
          image: 'cinnamon.jpg',
          consistency: 'SOLID',
          name: 'cinnamon',
          nameClean: 'cinnamon',
          original: '1 1/2 teaspoons cinnamon',
          originalName: 'cinnamon',
          amount: 1.5,
          unit: 'teaspoons',
          meta: [],
          measures: {
            us: {
              amount: 1.5,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            },
            metric: {
              amount: 1.5,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            }
          }
        },
        {
          id: 9152,
          aisle: 'Produce',
          image: 'lemon-juice.jpg',
          consistency: 'LIQUID',
          name: 'juice of lemon',
          nameClean: 'lemon juice',
          original: '1 lemon, grated rind and juice of',
          originalName: 'lemon, grated rind and juice of',
          amount: 1,
          unit: '',
          meta: [
            'grated'
          ],
          measures: {
            us: {
              amount: 1,
              unitShort: '',
              unitLong: ''
            },
            metric: {
              amount: 1,
              unitShort: '',
              unitLong: ''
            }
          }
        },
        {
          id: 2025,
          aisle: 'Spices and Seasonings',
          image: 'ground-nutmeg.jpg',
          consistency: 'SOLID',
          name: 'nutmeg',
          nameClean: 'nutmeg',
          original: '1/4 teaspoon nutmeg',
          originalName: 'nutmeg',
          amount: 0.25,
          unit: 'teaspoon',
          meta: [],
          measures: {
            us: {
              amount: 0.25,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            },
            metric: {
              amount: 0.25,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            }
          }
        },
        {
          id: 2025,
          aisle: 'Spices and Seasonings',
          image: 'ground-nutmeg.jpg',
          consistency: 'SOLID',
          name: 'nutmeg',
          nameClean: 'nutmeg',
          original: '1/2 teaspoon nutmeg',
          originalName: 'nutmeg',
          amount: 0.5,
          unit: 'teaspoon',
          meta: [],
          measures: {
            us: {
              amount: 0.5,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            },
            metric: {
              amount: 0.5,
              unitShort: 'tsps',
              unitLong: 'teaspoons'
            }
          }
        },
        {
          id: 19335,
          aisle: 'Baking',
          image: 'sugar-in-bowl.png',
          consistency: 'SOLID',
          name: 'white sugar',
          nameClean: 'sugar',
          original: '1 cup white sugar',
          originalName: 'white sugar',
          amount: 1,
          unit: 'cup',
          meta: [
            'white'
          ],
          measures: {
            us: {
              amount: 1,
              unitShort: 'cup',
              unitLong: 'cup'
            },
            metric: {
              amount: 236.588,
              unitShort: 'ml',
              unitLong: 'milliliters'
            }
          }
        }
      ],
      id: 632481,
      title: 'Apple Brown Betty',
      readyInMinutes: 45,
      servings: 6,
      sourceUrl: 'http://www.foodista.com/recipe/JNRHGSYB/apple-brown-betty',
      openLicense: -1,
      image: 'https://spoonacular.com/recipeImages/632481-556x370.jpg',
      imageType: 'jpg',
      summary: "Apple Brown Betty might be just the side dish you are searching for. For <b>$1.37 per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. This recipe makes 6 servings with <b>622 calories</b>, <b>3g of protein</b>, and <b>20g of fat</b> each. This recipe is liked by 9 foodies and cooks. A mixture of butter, juice of lemon, butter, and a handful of other ingredients are all it takes to make this recipe so delicious. It is a good option if you're following a <b>vegetarian</b> diet. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 25%</b>. This score is not so tremendous. Try <a href=\"https://spoonacular.com/recipes/apple-brown-betty-206104\">Apple Brown Betty</a>, <a href=\"https://spoonacular.com/recipes/apple-brown-betty-48410\">Apple Brown Betty</a>, and <a href=\"https://spoonacular.com/recipes/apple-fig-brown-betty-176043\">Apple-Fig Brown Betty</a> for similar recipes.",
      cuisines: [],
      dishTypes: [
        'side dish'
      ],
      diets: [
        'lacto ovo vegetarian'
      ],
      occasions: [],
      instructions: '<ol><li>Put a layer of cubed bread in buttered souffle dish that will hold 1-1/2 quarts. Mix apples, sugar and spices. Cover bread with a layer of apples.</li><li>Dot with butter; add a little lemon juice and rind. Repeat layers, ending in bread cubes, until dish is well-heaped. Cover and bake in a preheated 375-degree oven for 30 minutes. Uncover and bake until apples are tender and crust golden brown, about 30 more minutes. </li></ol>',
      analyzedInstructions: [
        {
          name: '',
          steps: [
            {
              number: 1,
              step: 'Put a layer of cubed bread in buttered souffle dish that will hold 1-1/2 quarts.',
              ingredients: [
                {
                  id: 18064,
                  name: 'bread',
                  localizedName: 'bread',
                  image: 'white-bread.jpg'
                }
              ],
              equipment: []
            },
            {
              number: 2,
              step: 'Mix apples, sugar and spices. Cover bread with a layer of apples.Dot with butter; add a little lemon juice and rind. Repeat layers, ending in bread cubes, until dish is well-heaped. Cover and bake in a preheated 375-degree oven for 30 minutes. Uncover and bake until apples are tender and crust golden brown, about 30 more minutes.',
              ingredients: [
                {
                  id: 10018064,
                  name: 'bread cubes',
                  localizedName: 'bread cubes',
                  image: 'croutons.png'
                },
                {
                  id: 9152,
                  name: 'lemon juice',
                  localizedName: 'lemon juice',
                  image: 'lemon-juice.jpg'
                },
                {
                  id: 9003,
                  name: 'apple',
                  localizedName: 'apple',
                  image: 'apple.jpg'
                },
                {
                  id: 1001,
                  name: 'butter',
                  localizedName: 'butter',
                  image: 'butter-sliced.jpg'
                },
                {
                  id: 2035,
                  name: 'spices',
                  localizedName: 'spices',
                  image: 'spices.png'
                },
                {
                  id: 18064,
                  name: 'bread',
                  localizedName: 'bread',
                  image: 'white-bread.jpg'
                },
                {
                  id: 0,
                  name: 'crust',
                  localizedName: 'crust',
                  image: ''
                },
                {
                  id: 19335,
                  name: 'sugar',
                  localizedName: 'sugar',
                  image: 'sugar-in-bowl.png'
                },
                {
                  id: 23572,
                  name: 'beef',
                  localizedName: 'beef',
                  image: 'beef-cubes-raw.png'
                }
              ],
              equipment: [
                {
                  id: 404784,
                  name: 'oven',
                  localizedName: 'oven',
                  image: 'oven.jpg'
                }
              ],
              length: {
                number: 60,
                unit: 'minutes'
              }
            }
          ]
        }
      ],
      originalId: null,
      spoonacularSourceUrl: 'https://spoonacular.com/apple-brown-betty-632481'
    }
  ]
}

module.exports = { data }
