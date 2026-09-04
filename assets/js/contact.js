const serviceChips =
document.querySelectorAll(".service-chip");

const projectSelect =
document.getElementById("project-type");

serviceChips.forEach(chip=>{

chip.addEventListener("click",()=>{

serviceChips.forEach(c=>{

c.classList.remove("active");

});

chip.classList.add("active");

projectSelect.value=

chip.dataset.service;

});

});

const contactButtons =
document.querySelectorAll(".contact-btn");

if (window.__enableAdvancedEffects) {
contactButtons.forEach(button=>{

let ticking = false;

button.addEventListener("mousemove",(e)=>{

if(!ticking){

requestAnimationFrame(()=>{

const rect =
button.getBoundingClientRect();

const x =
e.clientX-rect.left-rect.width/2;

const y =
e.clientY-rect.top-rect.height/2;

button.style.transform=

`translate(${x*.18}px,${y*.18}px) scale(1.04)`;

ticking = false;

});

ticking = true;

}

});

button.addEventListener("mouseleave",()=>{

button.style.transform="";

});

});
}


// ======================================
// AJAX CONTACT FORM
// ======================================

const contactForm =
document.getElementById("contact-form");

const contactSubmit =
contactForm?.querySelector(".contact-submit");


if(contactForm && contactSubmit){

    contactForm.addEventListener("submit", async (e)=>{

        e.preventDefault();


        // --------------------------------------
        // PREVENT DOUBLE SUBMISSION
        // --------------------------------------

        if(contactSubmit.disabled){

            return;

        }


        // --------------------------------------
        // BUTTON ELEMENTS
        // --------------------------------------

        const buttonText =
        contactSubmit.querySelector("span");


        const buttonIcon =
        contactSubmit.querySelector("svg");


        // --------------------------------------
        // LOADING STATE
        // --------------------------------------

        contactSubmit.disabled = true;

        contactSubmit.classList.add(
            "is-sending"
        );


        if(buttonText){

            buttonText.textContent =
                "Sending...";

        }


        if(buttonIcon){

            buttonIcon.style.display =
                "none";

        }


        try{

            // --------------------------------------
            // FORM DATA
            // --------------------------------------

            const formData =
            new FormData(contactForm);


            // --------------------------------------
            // SEND TO PHP
            // --------------------------------------

            const response =
            await fetch(
                contactForm.action,
                {
                    method:"POST",
                    body:formData
                }
            );


            // --------------------------------------
            // READ RESPONSE
            // --------------------------------------

let result;

try {

    result = await response.json();

} catch (parseError) {

    throw new Error(
        "The server returned an invalid response."
    );

}

if (!response.ok && response.status !== 429) {

    throw new Error(
        result.message ||
        "Unable to process your request."
    );

}
            // --------------------------------------
            // SUCCESS
            // --------------------------------------

            if(result.success){

                contactSubmit.classList.remove(
                    "is-sending"
                );


                contactSubmit.classList.add(
                    "is-success"
                );


                if(buttonText){

                    buttonText.textContent =
                        "Message Sent ✓";

                }


                // Reset form

                contactForm.reset();


                // Remove selected service chip

                document
                .querySelectorAll(".service-chip")
                .forEach(chip=>{

                    chip.classList.remove(
                        "active"
                    );

                });


                // Restore button after delay

                setTimeout(()=>{

                    contactSubmit.classList.remove(
                        "is-success"
                    );


                    if(buttonText){

                        buttonText.textContent =
                            "Send Message";

                    }


                    if(buttonIcon){

                        buttonIcon.style.display =
                            "";

                    }


                    contactSubmit.disabled =
                        false;

                },3500);


}else{

    // --------------------------------------
    // RATE LIMIT RESPONSE
    // --------------------------------------

    if(response.status === 429){

        contactSubmit.classList.remove(
            "is-sending"
        );

        contactSubmit.classList.add(
            "is-error"
        );

        if(buttonText){

            buttonText.textContent =
                result.message ||
                "Please wait before sending another message.";

        }

        if(buttonIcon){

            buttonIcon.style.display =
                "none";

        }

        // Keep the button disabled while
        // the rate-limit message is visible.

        setTimeout(()=>{

            contactSubmit.classList.remove(
                "is-error"
            );

            if(buttonText){

                buttonText.textContent =
                    "Send Message";

            }

            if(buttonIcon){

                buttonIcon.style.display =
                    "";

            }

            contactSubmit.disabled =
                false;

        },4000);

        return;

    }


    // --------------------------------------
    // OTHER SERVER ERRORS
    // --------------------------------------

    throw new Error(
        result.message ||
        "Unable to send message."
    );

}


        }catch(error){

            console.error(
                "Contact form error:",
                error
            );


            // --------------------------------------
            // ERROR STATE
            // --------------------------------------

            contactSubmit.classList.remove(
                "is-sending"
            );


            contactSubmit.classList.add(
                "is-error"
            );


            if(buttonText){

                buttonText.textContent =
                    "Try Again";

            }


            if(buttonIcon){

                buttonIcon.style.display =
                    "";

            }


            setTimeout(()=>{

                contactSubmit.classList.remove(
                    "is-error"
                );


                if(buttonText){

                    buttonText.textContent =
                        "Send Message";

                }


                contactSubmit.disabled =
                    false;

            },3000);

        }

    });

}