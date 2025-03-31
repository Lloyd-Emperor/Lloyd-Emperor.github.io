// document.querySelector("a[href='#contact']").addEventListener("click", function () {
//     location.reload();
// });

// document.querySelectorAll("nav a").forEach(link => {
//     link.addEventListener("click", function() {
//         let sectionId = this.getAttribute("href");  
//         localStorage.setItem("lastSection", sectionId);  
//     });
// });

// window.onload = function () {
//     let lastSection = localStorage.getItem("lastSection");
//     if (lastSection) {
//         location.hash = lastSection; // Scrolls to the last section
//     }
// };


// document.querySelectorAll("nav a").forEach(link => {
//     link.addEventListener("click", function() {
//         location.reload();
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const lastSection = sessionStorage.getItem("lastSection");
    if (lastSection) {
        window.location.hash = lastSection;
    }
});

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function () {
        sessionStorage.setItem("lastSection", this.getAttribute("href"));
    });
});


// Typing animation
var typed = new Typed(".typing",{
    strings:["Web Developer" , "Data Analyst"],
    typeSpeed:100,
    Backspeed:600,
    loop:true
})


// Aside
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length; // Corrected to use navList.length

    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {

        for(let i=0; i<totalSection; i++){
            allSection[i].classList.remove("back-section");
        }
    

        removeBackSection();
    
    
        for (let j = 0; j < totalNavList; j++) {

            if(navList[j].querySelector("a").classList.contains("active")){

                addBackSecton(j);

            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);

        if(window.innerWidth < 1200){
            asideSectionTogglerBtn(); 
        }
    });
}

function addBackSecton(num){
    allSection[num].classList.add("back-section");


}

function removeBackSection(){
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.remove("back-section");
    }


}

function showSection(element){

    for(let i=0; i<totalSection; i++){
        allSection[i].classList.remove("active");
    }

    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}


function updateNav(element){
    for(let i=0; i<totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];

        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");


        }
    }


}

document.querySelector(".hire-me").addEventListener("click", function(){

    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSecton(sectionIndex);

})


const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
    navTogglerBtn.addEventListener("click", () => {

        asideSectionTogglerBtn();

    })

    function asideSectionTogglerBtn(){
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        for(let i=0; i<totalSection; i++){
            allSection[i].classList.toggle("open"); 
        }
    }


// alert
    let notifications = document.querySelector('.notifications');
    let success = document.getElementById('success');




    
//  message
function createToast(type, icon , title , text){
    let newToast = document.createElement('div');
    newToast.innerHTML = ` 
     <div class="toast ${type}">
        <i class="${icon}"></i>
    <div class="content">
    <div class="title">${title}</div>
        <span>${text}</span>
    </div>
    <i class="fa-solid fa-xmark onclick="(this.parentElement).remove()"></i>
</div>`;

    notifications.appendChild(newToast);

    // Remove the toast after 5 seconds
    setTimeout(() => {
        newToast.remove();
    }, 5000);
}


function SendMail() {
    var params = {
        from_name: document.getElementById("fullname").value,
        email_id: document.getElementById("email_id").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_7ot9mnk", "template_igi6egx", params, "KkdQF_7HsBIEDSWKy")
    .then(function(response) {
        console.log("Email sent successfully!", response);
        let type = 'success';
        let icon = 'fa-solid fa-circle-check';
        let title = 'Message Sent!';
        let text = 'Your Message to Honour Akhigbe has been sent successfully!';
        createToast(type, icon, title, text);

        // ✅ Clear form fields after successful send
        document.getElementById("fullname").value = "";
        document.getElementById("email_id").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
    })
    .catch(function(error) {
        console.error("Failed to send email:", error);
        let type = 'error';
        let icon = 'fa-solid fa-circle-xmark';
        let title = 'Message Failed!';
        let text = 'Oops! Something went wrong. Try again later.';
        createToast(type, icon, title, text);
    });
}
