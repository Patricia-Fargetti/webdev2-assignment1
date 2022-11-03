const axios = require('axios');
const blog = require('../models/blog');

const blogIndex = (req,res) => {
let isAuthenticated = req.oidc.isAuthenticated();
if(isAuthenticated){
    res.render("index", {
    title: "My Guitar",
    isAuthenticated: isAuthenticated
});
}else{
    res.render("noindex", {
        title: "My Guitar",
        isAuthenticated: isAuthenticated
});
}
}
const secureEndPoint = async(req,res) => {

}

const roleBasedAuth = async(req,res) => {
    let data = {}
    const {token_type, access_token} = req.oidc.accessToken;

try{
    const apiResponse = await axios.get('http://localhost:5000/role',{
        header:{
            authorization: `${token_type} ${access_token}`
        
    }
});
data = apiResponse.data;

res.render('create',{
    title: 'Admin User',
    isAuthenticated: req.oidc.isAuthenticated(),
    user:req.oidc.user,
    data: data
})
}catch(e){
    console.log(e);
    res.render('notAccess',{
        title: 'Not Access Page',
        isAuthenticated:req.oidc.isAuthenticated()
    });
}

}

const blogCreatePost = (req,res) => {
const blog = new Blog(req.body);
blog.save()
.then(result => {
res.redirect('/');

})
.catch(err => {
    console.log(err);


});



}
module.exports={
blogIndex,
secureEndpoint,
roleBasedAuth,
blogCreatePost

}

