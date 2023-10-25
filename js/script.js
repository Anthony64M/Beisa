jQuery(document).ready(function($) {
    // Chat interface code
    jQuery(document).on('click', '.iconInner', function(e) {
        jQuery(this).parents('.botIcon').addClass('showBotSubject');
        $("[name='msg']").focus();
    });

    jQuery(document).on('click', '.closeBtn, .chat_close_icon', function(e) {
        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').removeClass('showMessenger');
    });

    jQuery(document).on('submit', '#botSubject', function(e) {
        e.preventDefault();

        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').addClass('showMessenger');
    });

    $(document).on("submit", "#messenger", function(e) {
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

        // Handle other cases here
        // ...

        var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
        $('.Messages').animate({ scrollTop: lastMsg }, 'slow');
    });

    // Chatbot code
    try {
        // Bot responses
        const botResponses = {
            greeting: ['Hi there! Welcome to Beisa Hotel.', 'Hello! How may I help you?'],
            rooms: ['We have standard rooms available. Deluxe rooms with extra amenities are also available.'],
            booking: ['Please visit our website www.beisahotelandconferencecentre.co.ke to see room availability and book online.'],
            contact: ['Feel free to call us at +254 722 454978 for any questions or to book over the phone.']
        };

        // Validate bot responses
        if (!botResponses || Object.keys(botResponses).length === 0) {
            throw new Error('No bot responses defined!');
        }

        // Function to create the chatbot
        const createChatbot = (botId) => {
            // Chatbot UI and elements - Note: You need to define chatbotUI
            const chatEl = document.createElement('div');
            chatEl.innerHTML = chatbotUI; // Make sure chatbotUI is defined
            const messagesEl = chatEl.querySelector('.messages');
            const formEl = chatEl.querySelector('#messenger');
            const inputEl = formEl.querySelector('input');

            // Bot response handler - You need to handle bot responses in this function
            const botResponse = (text) => {
                // Handle bot responses, e.g., by appending messages to the chat interface
                appendMsg(text);
            };

            // Form submit handler
            formEl.addEventListener('submit', (e) => {
                e.preventDefault();

                const msg = inputEl.value;
                inputEl.value = '';

                // Handle user input and generate bot responses
                let response = 'Sorry, I did not understand that.';

                if (msg.includes('hello')) {
                    response = botResponses.greeting[0];
                } else if (msg.includes('room')) {
                    response = botResponses.rooms[0]; // Get the first response
                } else if (msg.includes('book')) {
                    response = botResponses.booking[0]; // Get the first response
                } else if (msg.includes('contact')) {
                    response = botResponses.contact[0]; // Get the first response
                }

                // Display the bot's response in the chat interface
                appendMsg(response);
            });
        };

        // Function to submit a message to WhatsApp
        const submitToWhatsApp = async (botId, userMsg, botMsg) => {
            try {
                // API call to send a WhatsApp message - Replace instanceXXXX and tokenYYYY with actual values
                await fetch('https://api.chat-api.com/instanceXXXX/message?token=YYYY', {
                    method: 'POST',
                    body: JSON.stringify({
                        phone: '+254722454978',
                        body: `Bot #${botId} transcript: \nUser: ${userMsg}\nBot: ${botMsg}`
                    })
                });
            } catch (err) {
                console.error('Error submitting to WhatsApp', err);
            }
        };
    } catch (err) {
        // Handle errors
        console.error(err);
        botResponse('Sorry, something went wrong. Please try again later.'); // You need to define botResponse
    }
});
