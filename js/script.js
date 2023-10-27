// Imports
import { SessionsClient } from "https://esm.sh/dialogflow";


$(document).ready(function () {
  // Function to show the chatbot subject
  function showChatBotSubject() {
    $(this).parents('.botIcon').addClass('showBotSubject');
    $("[name='msg']").focus();
  }

  // Function to close the chatbot
  function closeChatBot() {
    var botIcon = $(this).parents('.botIcon');
    botIcon.removeClass('showBotSubject');
    botIcon.removeClass('showMessenger');
  }

  // Function to handle the bot subject form submission
  function handleBotSubjectFormSubmit(e) {
    e.preventDefault();

    var botIcon = $(this).parents('.botIcon');
    botIcon.removeClass('showBotSubject');
    botIcon.addClass('showMessenger');
  }

  // Event listeners for chatbot subject and close buttons
  $(document).on('click', '.iconInner', showChatBotSubject);
  $(document).on('click', '.closeBtn, .chat_close_icon', closeChatBot);

  // Event listener for bot subject form submission
  $(document).on('submit', '#botSubject', handleBotSubjectFormSubmit);

  // Chatbot Code
  $(document).on("submit", "#messenger", function (e) {
    e.preventDefault();

    var val = $("[name=msg]").val().toLowerCase();
    var mainval = $("[name=msg]").val();
    var name = '';
    var nowtime = new Date();
    var nowhour = nowtime.getHours();

    function userMsg(msg) {
      $('.Messages_list').append('<div class="msg user"><span class="avtr"><figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure></span><span class="responsText">' + mainval + '</span></div>');
    }

    function appendMsg(msg) {
      $('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure></span><span class="responsText">' + msg + '</span></div>');
      $("[name='msg']").val("");
    }

    userMsg(mainval);

    if (val.indexOf("hello") > -1 || val.indexOf("hi") > -1 || val.indexOf("good morning") > -1 || val.indexOf("good afternoon") > -1 || val.indexOf("good evening") > -1 || val.indexOf("good night") > -1) {
      if (nowhour >= 12 && nowhour <= 16) {
        appendMsg('Good afternoon from Beisa Hotel!');
      } else if (nowhour >= 10 && nowhour <= 12) {
        appendMsg('Hi there! How can Beisa Hotel assist you?');
      } else if (nowhour >= 0 && nowhour <= 10) {
        appendMsg('Good morning! How can Beisa Hotel assist you today?');
      } else {
        appendMsg('Good evening from Beisa Hotel!');
      }

      appendMsg("May I know your name?");
    } else if (val.indexOf("i have a problem with") > -1) {
      if (val.indexOf("reservation") > -1 || val.indexOf("booking") > -1) {
        appendMsg("I can help you with your reservation. Please provide your reservation details.");
      } else {
        appendMsg("I'm sorry, I couldn't understand your request. Please ask something else related to Beisa Hotel.");
      }
    } else if (val.indexOf("my name is ") > -1 || val.indexOf("i am ") > -1 || val.indexOf("i'm ") > -1 || val.split(" ").length < 2) {
      if (val.indexOf("my name is") > -1) {
        name = val.replace("my name is", "");
      } else if (val.indexOf("i am") > -1) {
        name = val.replace("i am", "");
      } else if (val.indexOf("i'm") > -1) {
        name = val.replace("i'm", "");
      } else {
        name = mainval;
      }

      appendMsg("Hello, " + name + "! How can Beisa Hotel assist you today?");
    } else {
      appendMsg("I'm sorry, I couldn't understand your request. Please ask something related to Beisa Hotel.");
    }

    var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
    $('.Messages').animate({
      scrollTop: lastMsg
    }, 'slow');
  });
});

// Dialogflow setup
const sessionClient = new SessionsClient({ projectId: 'beisa-403309' });

// Configuration
const BOT_NAME = 'Claude';
const BOT_AVATAR = 'bot.png';
const USER_AVATAR = 'user.png';

// DOM Elements
const chatbot = document.getElementById('chatbot');
const chatHistory = document.getElementById('chat-history');
const chatForm = document.getElementById('messenger');
const chatInput = document.getElementById('chat-input');

// Initialize chatbot
function init() {
  // Show greeting
  showBotMessage("Hi there! I'm Claude.");

  // Form submit listener
  chatForm.addEventListener('submit', onChatSubmit);
}

// Form submit handler
function onChatSubmit(e) {
  e.preventDefault();

  let input = chatInput.value;
  showUserMessage(input);
  getBotResponse(input);
  chatInput.value = '';
}

// Get response from Dialogflow
async function getBotResponse(input) {
  let request = {
    session: sessionClient.sessionPath('beisa-403309', 'unique-session-id'),
    queryInput: {
      text: {
        text: input,
        languageCode: 'en-US',
      },
    },
  };

  let responses = await sessionClient.detectIntent(request);
  let botMessage = responses[0].queryResult.fulfillmentText;
  showBotMessage(botMessage);
}

// Show user message
function showUserMessage(msg) {
  chatHistory.innerHTML += `
    <div class="user-msg">
      <span>${msg}</span>
    </div>
  `;
}

// Show bot response
function showBotMessage(msg) {
  chatHistory.innerHTML += `
    <div class="bot-msg">
      <span>${msg}</span>
    </div>
  `;
}

// Initialize
init();
