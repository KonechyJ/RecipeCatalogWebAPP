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
 * GET Categories/id
 * CATEGORIES by id
 * 
 * 
 * 
 */

exports.exploreCategoriesById = async(req, res) => {
    try{
        // getting category id
         let categoryId = req.params.id;

        //Database query to grab the category
        const limit = 20;
        const categoriesById= await Recipe.find({ "category": categoryId}).limit(limit);

        // Below, you can pass objects to the HTML scripts, here we are passing a new title
        res.render('categories', { title: 'Recipe App Categories', categoriesById});
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


/**
 * POST /search
 * Search
 * 
 * 
 */

 exports.searchRecipe = async(req, res) => {

    //searchTerm
    try{
      let searchTerm = req.body.searchTerm;

      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      
      res.render('search', { title: 'Recipe App Recipeb - Search', recipe});
    }
    catch(e){
        res.status(500).send({message: e.message || "ERROR"});
    }
}



/**
 * GET /see-newest
 * see newest
 * 
 * 
 */
 exports.seeNewest = async(req, res) => {
    try{
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);

        // Below, you can pass objects to the HTML scripts, here we are passing a new title
        res.render('see-newest', { title: 'Recipe App Recipe - See Whats New', recipe});
    }
    catch(e){
        res.status(500).send({message: e.message || "ERROR"});
    }
}

/**
 * GET /see-random
 * see a random recipe
 * 
 * 
 */
 exports.seeRandom = async(req, res) => {
    try{

        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();


        // Below, you can pass objects to the HTML scripts, here we are passing a new title
        res.render('see-random', { title: 'Recipe App Recipe - Explore a Random Recipe', recipe});
    }
    catch(e){
        res.status(500).send({message: e.message || "ERROR"});
    }
}



/**
 * GET /submit Recipe
 * upload a recipe
 * 
 * 
 */
 exports.submitRecipe = async(req, res) => {
     const infoErrorsObj = req.flash("infoErrors");
     const infoSubmitObj = req.flash("infoSubmit");

    res.render('submit-recipe', { title: 'Recipe App Recipe - Submit Recipe', infoErrorsObj, infoSubmitObj });
 }


 /**
 * POST /submit Recipe
 * upload a recipe
 * 
 * 
 */
  exports.submitRecipeOnPost = async(req, res) => {
    try{
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No Files where uploaded.');
          } else {
      
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
      
            uploadPath = require('path').resolve('./') + '/static/Uploads/' + newImageName;
      
            imageUploadFile.mv(uploadPath, function(err){
              if(err) return res.satus(500).send(err);
            })
      
          }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
          });

          await newRecipe.save();

        req.flash('infoSubmit', "Recipe has been added")
        res.redirect('/submit-recipe');
    }
    catch(e){
       req.flash('infoErrors', e)
       res.redirect('/submit-recipe');
    }
 }

 // Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();
 exports.deleteRecipe = async(req, res) => {
    try{
        //Database query to grab the recipe
        let recipeID = req.params.id;

        const recipe = await Recipe.findById(recipeID);

        // console.log(recipe);

        // Below is when we would delete the recipe
        // await recipe.deleteOne({ name: 'New Recipe From Form' });

        // Below, you can pass objects to the HTML scripts, here we are passing a new title
        res.render('delete-recipe', { title: 'Recipe App Recipe - Delete', recipe});
    }
    catch(e){
        res.status(500).send({message: e.message || "ERROR"});
    }
}



// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();
exports.updateRecipe = async(req, res) => {
    try{
        //Database query to grab the recipe
        let recipeID = req.params.id;

        const recipe = await Recipe.findById(recipeID);

        // Below, you can pass objects to the HTML scripts, here we are passing a new title
        res.render('update-recipe', { title: 'Recipe App Recipe - Update', recipe});
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