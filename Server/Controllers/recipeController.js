require('../Models/database');

const Category = require('../Models/category');
const Recipe = require('../Models/recipe');

/**
 * GET PAAGE
 * HOMEPAGE
 * 
 * 
 */

exports.homepage = async(req, res) => {
    try{
        //Database query to grab the category
        const limit = 5;
        const categories = await Category.find({}).limit(limit);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limit);
        const american = await Recipe.find({'category': 'American'}).limit(limit);
        const chinese = await Recipe.find({'category': 'Chinese'}).limit(limit);

        //Create a food object to put everything in
        const food = {latest, american, chinese};

        // Below, you can pass objects to the HTML scripts, here we are passing categories and food
        res.render('index', { title: 'Recipe App Homepage', categories, food});
    }
    catch(e){
        res.status(500).send({message: e.message || "ERROR"});
    }
}

/**
 * GET Categories Page
 * CATEGORIES
 * 
 * 
 */
 exports.exploreCategories = async(req, res) => {
    try{
        //Database query to grab the category
        const limit = 20;
        const categories = await Category.find({}).limit(limit);

        // Below, you can pass objects to the HTML scripts, here we are passing a new title
        res.render('categories', { title: 'Recipe App Categories', categories});
    }
    catch(e){
        res.status(500).send({message: e.message || "ERROR"});
    }
}

/**
 * GET /recpie/:id
 * RECPIE Page
 * 
 * 
 */
 exports.exploreRecipe = async(req, res) => {
    try{
        //Database query to grab the recipe
        let recipeID = req.params.id;

        const recipe = await Recipe.findById(recipeID);

        // Below, you can pass objects to the HTML scripts, here we are passing a new title
        res.render('recipe', { title: 'Recipe App Recipe', recipe});
    }
    catch(e){
        res.status(500).send({message: e.message || "ERROR"});
    }
}




// async function insertLiteralCategoryData(){
//     try{
//         await Category.insertMany([
//             {
//                 "name": "Thai",
//                 "image": "Thai.jpg"
//             },
//             {
//                 "name": "American",
//                 "image": "American.jpg"
//             },
//         ]);
//     }
//     catch(e) {
//         console.log(e);
//     }
// }

// insertLiteralCategoryData();

// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Stir-fried vegtables",
//         "description": `There are so many things to love about this stir-fry recipe – it's quick, tasty and full of goodness`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 clove of garlic",
//           "1 fresh red chilli",
//           "3 spring onions",
//           "1 small red onion",
//           "1 handful of mangetout",
//           "a few shiitake mushrooms"
//         ],
//         "category": "Chinese", 
//         "image": "stir-fried-vegtables.jpg"
//       },
//       { 
//         "name": "Southern fried chicken",
//         "description": `This is an incredible fried chicken recipe, one that I’ve subtly evolved from that of my dear friend Art Smith, one of the kings of southern American comfort food. I’ve finished the chicken in the oven, purely because you really do need a big fryer to do it properly, as well as for good temperature control, and this method is much friendlier for home cooking.`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "4 free-range chicken thighs , skin on, bone in",
//           "4 free-range chicken drumsticks",
//           "200 ml buttermilk",
//           "4 sweet potatoes",
//           "200 g plain flour"
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();