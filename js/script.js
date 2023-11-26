const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const API_KEY = ""; // Leave API key empty
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
}

const greetings = ["hey", "hello", "hi","ssup","sasa", "yoh"];

const generateResponse = (chatElement) => {

  const messageElement = chatElement.querySelector("p");
  
  let response;

  if (greetings.some(g => userMessage.toLowerCase().includes(g))) {
    response = "Welcome to Beisa Hotel. If you are looking for room reservations type 'hotel', if you want conference details type 'conference'. Thank you.";

  } else if (userMessage.toLowerCase().includes("hotel")) {
    response = "To make a room reservation at Beisa Hotel, please visit our website at the book now section or for speedy connection contact us at +254 722 454978.";

  } else if (userMessage.toLowerCase().includes("conference")) {
    response = "Beisa Hotel offers various amenities including a pool, restaurant and conference center. Head to the gallery section to view our conference centre then contact +254 722 454978 to get the variance in each conference. For more details, please contact us at +254 722 454978.";
  
  } else {
    response = "I'm sorry, I don't understand. Please contact customer care at +254 722 454978 for assistance.";  
  }

  messageElement.textContent = response;
  
  chatbox.scrollTo(0, chatbox.scrollHeight);

}
const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if(!userMessage) return;
  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;
  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window 
  // width is greater than 800px, handle the chat
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));