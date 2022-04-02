const request = require("request-promise");

exports.renderHome = async(req,res) => 
{
	res.render('index', {title: "Hello World"});
}