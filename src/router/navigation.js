module.exports = {
  globalNavigation : function (to, from, next) {
    if(localStorage.getItem('token')){
      next({
        name : 'homePage'
      })
    }else{
      next()
    }
  },
  authNavigation : function (to, from, next) {
    if(!localStorage.getItem('token')){
      next({
        name : 'loginPage'
      })
    }else{
      next()
    }
  }
}