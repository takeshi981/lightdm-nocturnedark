const pwShowHide = document.querySelectorAll(".pw_hide"),
      home = document.querySelector(".home"),
      username = document.querySelector("#login__username"),
      pass = document.querySelector("#login__password"),
      buttonLogin = document.querySelector("#login-button"),
      formOpenBtn = document.querySelector("#login-picture"),
      formContainer = document.querySelector(".form_container"),
      formCloseBtn = document.querySelector("#form_close"),
      dropdown = document.querySelectorAll(".dropdown");
      

let current_user = 0;
let current_session = 0;

function display_user_picture(current_user){

  

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

 function populate_drop_down(){

        lightdm.sessions.forEach(function(session, index){
         
         
         
         
           let session_name = lightdm.sessions[index].key;
           
           document.getElementById("dropdown-content").insertAdjacentHTML("beforeend", `
            
           <li class="options">`+session_name+`</li>`);
         
        });
        
       }
       
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
      
          
          dropdown.forEach((opt) => {

              opt.addEventListener("click", () => {

                let selected_option = opt.querySelector(".options").innerText;
          
              current_session = selected_option;

              alert("clicked "+current_session);
            })
          })
            
            }
            
          }
          
        
        
      
   
display_user_picture(current_user);
populate_drop_down();