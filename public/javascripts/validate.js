const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPass = document.getElementById('regPass');
const regBox = document.getElementById('regBox');
const regSubmit = document.getElementById('regSubmit');
const regForm = [regName,regEmail,regPass,regBox];
const regValidateError = document.getElementById('regValidateError');


function annie1(id,opacity,transY){
    id.style.opacity=opacity;
    id.style.transform="translateY("+transY+"px)"
}
//this checks all fields are filled out and updates the button and validate error message
function validateFill(){
    for(i=0;i<regForm.length;i++){
    regForm[i].addEventListener("input", function(){
     if (regName.value==="" || regEmail.value==="" || regPass.value==="" || regBox.checked===false){
         console.log('its null')
         annie1(regValidateError,1,0);
       //  regValidateError.style.opacity=1;
        // regValidateError.style.transform="translateY(0px)"
         regSubmit.disabled=true;
     }else{
         console.log('not Null');
         regValidateError.style.opacity=0;
         regValidateError.style.transform="translateY(-15px)"
         regSubmit.disabled=false;
         }
        }
       )
    }
    }
// function validateEmail(){
  
//         regEmail.addEventListener("input", function(){
//          if (){
//              console.log('its null')
//              regValidateError.style.opacity=1;
//              regValidateError.innerHTML="must be a valid email";
//              regValidateError.style.transform="translateY(0px)"
//              regSubmit.disabled=true;
//          }else{
//              console.log('not Null');
//              regValidateError.style.opacity=0;
//              regValidateError.innerHTML="*please fill out all fields";
//              regValidateError.style.transform="translateY(-15px)"
//              regSubmit.disabled=false;
//              }
//             }
//            )
     
// }





function validate(){
    validateFill();
   // validateEmail();

    console.log('validator loaded')


}

