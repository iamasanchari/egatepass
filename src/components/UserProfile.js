var UserProfile = (function() {
    var usr_token = "";
  
    var getName = function() {  
        usr_token= localStorage.getItem("UserToken")    
      return  usr_token;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(token) {
        usr_token = token;     
      localStorage.setItem("UserToken", token);
    };
  
    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserProfile;