const pwShowHide = document.querySelectorAll(".pw_hide"),
      home = document.querySelector(".home"),
      username = document.querySelector("#login__username"),
      pass = document.querySelector("#login__password"),
      buttonLogin = document.querySelector("#login-button"),
      formOpenBtn = document.querySelector("#login-picture"),
      formContainer = document.querySelector(".form_container"),
      formCloseBtn = document.querySelector("#form_close"),
      optionMenu = document.querySelector(".dropdown"),
      back = document.querySelector("#userback"), 
      fwd = document.querySelector("#userfwd");
      

let current_user = 0;
let current_session = 0;

function display_user_picture(current_user){

        if ( current_user >= 0 && lightdm.users[current_user] !== null ) {
      document.getElementById("login-picture").style.opacity = 0;
  
        setTimeout(function(){
          document.getElementById("login-picture").src = lightdm.users[current_user].image;
          document.getElementById("login-picture").addEventListener("load", function(){
            document.getElementById("login-picture").style.opacity = 1;
          });
        }, 350);
        var username = lightdm.users[current_user].name;
        document.getElementById("login__username").placeholder = username;
        lightdm.start_authentication(lightdm.users[current_user].name);
        document.getElementById("login__password").focus();
      }
    }

    

      pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => {
          let getPwInput = icon.parentElement.parentElement.querySelector("input");
          if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("octicon--eye-closed", "octicon--eye")
          } else {
            getPwInput.type = "password";
            icon.classList.replace("octicon--eye", "octicon--eye-closed");
          }
        });
      });
      const dropdownBtns = document.querySelectorAll('.dropdown2');
      let lastOpened = null;
      
      dropdownBtns.forEach(btn => btn.addEventListener('click', function() {
        const menuContent = this.nextElementSibling;
      
        if (lastOpened !== null) {
          const target = lastOpened;
       
          target.addEventListener('animationend', () => {
            target.classList.remove('show', 'animate-out');
       
            if (target === lastOpened) {
              lastOpened = null;
            }
          }, {
            once: true
          });
      
          target.classList.add('animate-out');
        }
      
        if (lastOpened !== menuContent) {
          menuContent.classList.add('show');
          lastOpened = menuContent;
        }
      }));
 function populate_drop_down(){

        lightdm.sessions.forEach(function(session, index){
         
         
         
         
           let session_name = lightdm.sessions[index].key;
           
           document.getElementById("dropdown-content").insertAdjacentHTML("beforeend", `
            
           <li class="option"><span class="option-text">`+session_name+`</span></li>`);
         
        });
        
       }
       document.onreadystatechange = () => {
        if (document.readyState == "complete") {
        
        const options = optionMenu.querySelectorAll(".option");
        options.forEach((option) => {
          
          option.addEventListener("click",  () => {
            
            let selectedOption = option.querySelector(".option-text").innerText;
            
        
           optionMenu.classList.remove("active");
           
           
           current_session = selectedOption;
           alert("clicked "+current_session);
          });
        });
      }
      }
back.addEventListener("click", function(evt){
  
  current_user--;
    if (lightdm.users[current_user] !== undefined){
      
        display_user_picture(current_user);
    }
   
 
});
fwd.addEventListener("click", function(evt){
  
  current_user++;
  
    if (lightdm.users[current_user] !== undefined){
      display_user_picture(current_user);
    }
  
  
});

 buttonLogin.addEventListener("click", function(evt){
  evt.preventDefault();
  provide_secret();
});         

function start_authentication(){
   
   
  lightdm.start_authentication(user);
  
  show_message("Starting authentication");
  
  provide_secret();
}

function provide_secret()
{
  	let password = pass.value || null;
  	if(password !== null) {
        lightdm.provide_secret(password);
    } else {
      lightdm.cancel_authentication();
      display_user_picture(current_user);
      
    }
}        
      
function authentication_complete()
{
    if (lightdm.is_authenticated) {
    	
	lightdm.login(lightdm.authentication_user, current_session);
    
  } else {
   	
    	lightdm.cancel_authentication();
      display_user_picture(current_user);
      show_message("Invalid password");
   	}

}   
display_user_picture(current_user);
populate_drop_down();