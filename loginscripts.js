
function start() {

    let submit = document.querySelector(".submitButton");
    let reg = new RegExp(/^[0-9a-zA-Z]+$/);

    submit.addEventListener("click", function() {
        console.log("submitButton was clicked");

        const user = document.querySelector(".username");
        const note = document.querySelector(".notebox").value;
        
        if(reg.test(user.value) && note!=null) {
            
            console.log("Valid username.");

            document.location.href = "usernotes.html";

            const url = "http://localhost:3000/";
            const dataObject = {
                noteData: note,
                userName: user.value
            };
    
            const fetchObject = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(dataObject)
            };

            fetch(url+'usernotes.html', fetchObject) 
                .then(response => response.json())
                .then(jsonObject => {                    
                    console.log(jsonObject);
                });                


        }
        else {
            alert("You may only use alphanumeric characters for username.");
            alert("Make sure message is not empty");
        }

        
        
    });

}
window.addEventListener("load", start);