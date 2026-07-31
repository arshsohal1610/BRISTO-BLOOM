const contactForm = document.getElementById("contactForm");


if(contactForm){

    contactForm.addEventListener("submit", async (e)=>{

        e.preventDefault();


        const contactData = {

            name: document.getElementById("contactName").value,

            email: document.getElementById("contactEmail").value,

            subject: document.getElementById("contactSubject").value,

            message: document.getElementById("contactMessage").value

        };


        try{


            const response = await fetch(
                "http://localhost:5000/api/contacts",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body: JSON.stringify(contactData)
                }
            );


            const data = await response.json();


            if(data.success){

                document.getElementById("contactStatus").textContent =
                "Message sent successfully!";

                contactForm.reset();

            }


        }catch(error){

            console.log(error);

            document.getElementById("contactStatus").textContent =
            "Something went wrong.";

        }


    });

}