/**
 * GET PAAGE
 * HOMEPAGE
 * 
 * 
 */

exports.homepage = async(req, res) => {

// Below, you can pass objects to the HTML scripts, here we are passing a new title
res.render('index', { title: 'Recipe App Homepage'});

}