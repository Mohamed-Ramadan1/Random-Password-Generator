const lengthSlider = document.querySelector(".pass-length input");
const passwordLength = document.querySelector(".pass-length span");
const genrateBtn = document.querySelector(".generate-btn");
const options = document.querySelectorAll(".option input");
const passwordInput = document.querySelector(".input-box input");
const passwordIndecator = document.querySelector(".pass-indecator")
const copyBtn=document.querySelector(".input-box button")


const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols:"^!$&|[](){}:;.,*+-#@<>~"
};

const genratePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let exDuplicate = false;
    let passLength = lengthSlider.value;
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplication" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += ` ${staticPassword} `;
            } else {
                exDuplicate=true
            }
        }
        
    });

    for (let i = 0; i < passLength; i++){
         let randomChar=staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (exDuplicate) {
            !randomPassword.includes(randomChar) || " " ? randomPassword += randomChar : i--;
            
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
};

// the power of the password
const updatePasswordIndecator = () => {
    passwordIndecator.id = lengthSlider.value <= 8 ? "week" : lengthSlider.value <= 16 ? "meduim" : "strong";
}
// update the value of the password length.
const updateSlider = () => {
    passwordLength.innerText = lengthSlider.value;
    genratePassword();
    updatePasswordIndecator();
};

// copy the genrated password
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyBtn.innerText = "copyed";
    setTimeout(()=> copyBtn.innerText = "Copy-Password",1500)
    
}


lengthSlider.addEventListener("input", updateSlider);
genrateBtn.addEventListener("click", genratePassword);
copyBtn.addEventListener("click", copyPassword);

updateSlider(); 
