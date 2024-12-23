// JavaScript section
const menu = document.querySelector('#mobile_menu');
const menuLinks = document.querySelector('.navbar_menu');
const navLogo = document.querySelector('#navbar_logo');

// Display mobile menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const homeMenu = document.querySelector('#home_page');
    const aboutMenu = document.querySelector('#about_page');
    const servicesMenu = document.querySelector('#services_page');
    let scrollPos = window.scrollY;

    // Add 'highlight' class to menu items based on scroll position
    if (window.innerWidth > 800 && scrollPos < 400) {
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
    } else if (window.innerWidth > 960 && scrollPos < 1275) {
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
        servicesMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
    }

    // Remove highlight class on smaller screens or if no match
    if (window.innerWidth < 768 && scrollPos < 0) {
        const elem = document.querySelector('.highlight');
        if (elem) elem.classList.add('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// Close mobile menu on menu item click
const hideMobileMenu = () => {
    if (window.innerWidth <= 768 && menu.classList.contains('is-active')) {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// chat Ai
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chataiToggler = document.querySelector(".chatai-toggler");
const chataiCloseBtn = document.querySelector(".close-btn");




let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"
        ? `<p></p>`
        : `<span class="material-symbols-outlined">Smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};


const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4", // Replace with a valid OpenAI model name
            messages: [{ role: "user", content: userMessage }]
        })
    };


    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content;


            // if (data.choices && data.choices[0] && data.choices[0].message) {
            //     message Element.textContent = data.choices[0].message.content;
            // } else {
            //     messageElement.textContent = "Sorry, I couldn't understand that. Please try again!";
            // }
        })
        .catch((error) => {
            // console.error("Error:", error);
            messageElement.classList.add("error");
            messageElement.textContent = "Error: Unable to fetch response!";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.style.height = `${inputInitHeight}px`;


    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);


    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);


    chatInput.value = ""; // Clear input after sending the message
};


chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", () => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});




sendChatBtn.addEventListener("click", handleChat);
chataiCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatai"));
chataiToggler.addEventListener("click", () => document.body.classList.toggle("show-chatai"));
