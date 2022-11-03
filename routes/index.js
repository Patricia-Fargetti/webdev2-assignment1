var express = require("express");
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');

// I tried using this code to redirect to the page user,
// which would be a different style from the index/home/landing page
// however I was not able to achieve the redirection, I also tried instaling npm history
//and did not work //

const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.href = "http://localhost:3000/user"
    );
  };


  
router.get('/', (req, res)=> {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render("index", { 
        title: "My auth app",
        isAuthenticated: isAuthenticated
     });console.log(req.oidc.accessToken)

     function redirectUser (user, context, callback) {
  let isAuthenticated = req.oidc.isAuthenticated();
context.redirect = {
   url: "http://localhost:3000/user"
    };
    return callback;
    }
});

router.get('/contact', (req, res)=>{
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render('contact', {
   
    title: "done",
    isAuthenticated: isAuthenticated

});
});

router.get('/user', (req, res)=>{
    let isAuthenticated = req.oidc.isAuthenticated();
    res.render('user', {
   
    title: "done",
    isAuthenticated: isAuthenticated

});


});


// trigger the endoint, and call the middleware, if the user is logged in or not
router.get('/secured', requiresAuth(), async(req, res) => {
    let data = {}
    const { token_type, access_token } = req.oidc.accessToken

    try{
        // calling the server to get the data, make sure you get the data before moving forward(async, await)
        const apiResponse = await axios.get('http://localhost:5000/private',
        {
            headers: {
                authorization: `${token_type} ${access_token}`
            }
        });
        data = apiResponse.data;
    }catch(e) {
        console.log(e);
    }

    // when there is not error, you will be redirected to the secured page with the data you get fromt the api
    res.render('secured', {
        title: "Secured Page",
        isAuthenticated: req.oidc.isAuthenticated(),
        data
    })
}) 



module.exports = router;