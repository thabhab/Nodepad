var noteCounter;

function newNote() {

    let div = document.createElement("div");
    let input = document.createElement("textarea");
    let btn = document.createElement("button");
    let cancelbtn = document.createElement("button");


    btn.addEventListener("click", ()=> {
        const url = "http://localhost:3000/";
        const dataObject = {
            noteData: input.value,
        };

        let fetchObject = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataObject)
        };

        fetch(url+'usernotes.html/a', fetchObject) 
            .then(response => response.json())
            .then(jsonObject => {                    
                console.log(jsonObject);
            });

        location.reload();
        

        
        
    });

    div.style.justifyContent = "center";

    input.rows = 4;
    input.classList.add("notebox");
    input.style.display = "block";
    input.style.background = "#434343";
    input.style.borderRadius = "6px";

    btn.classList.add("buttonStyles");
    btn.innerHTML = "Add Note";
    btn.style.display = "block";

    cancelbtn.classList.add("buttonStyles");
    cancelbtn.innerHTML = "Cancel";
    cancelbtn.style.display = "block";

    cancelbtn.addEventListener("click", ()=> {
        input.parentNode.removeChild(input);
        btn.parentNode.removeChild(btn);
        cancelbtn.parentNode.removeChild(cancelbtn);
    });

    div.appendChild(input);
    div.appendChild(btn);
    div.appendChild(cancelbtn);


    document.querySelector(".notesList").appendChild(div);



}

function editNote() {
    if(noteCounter > 0 && document.querySelectorAll('input[type="checkbox"]:checked').length == 1) {
        console.log(document.querySelectorAll('input[type="checkbox"]:checked').length);

        let li = document.querySelector('input[type="checkbox"]:checked');

        let checkboxlist = document.querySelectorAll('input[type="checkbox"]');
        console.log(checkboxlist.length);
        let i = 0;
        for(i=0; i<checkboxlist.length; i++) {
            if(checkboxlist[i].checked)
                break;
        }
        
        let text = li.parentNode.children[1].innerHTML;
        console.log(text);
        let div = document.createElement("div");
        let input = document.createElement("textarea");
        input.value = text;
        let cancelbtn = document.createElement("button");
        let btn = document.createElement("button");     

        btn.addEventListener("click", ()=> {
            const url = "http://localhost:3000/";
            const dataObject = {
                noteData: input.value,
                element: i
            };

            let fetchObject = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(dataObject)
            };

            fetch(url+'usernotes.html/b', fetchObject) 
                .then(response => response.json())
                .then(jsonObject => {                    
                    console.log(jsonObject);
                });

            location.reload();
            

            
            
        });
        input.rows = 4;
        input.classList.add("notebox");
        input.style.display = "block";
        input.style.background = "#434343";
        input.style.borderRadius = "6px";

        btn.classList.add("buttonStyles");
        btn.innerHTML = "Edit Note";
        btn.style.display = "block";

        cancelbtn.classList.add("buttonStyles");
        cancelbtn.innerHTML = "Cancel";
        cancelbtn.style.display = "block";
        cancelbtn.addEventListener("click", ()=> {
            input.parentNode.removeChild(input);
            btn.parentNode.removeChild(btn);
            cancelbtn.parentNode.removeChild(cancelbtn);
        });
        
        div.appendChild(input);
        div.appendChild(btn);
        div.appendChild(cancelbtn);        
        
        document.querySelector(".notesList").appendChild(div);




    }        
    else {
        alert("Must only have one checkbox checked to edit.");
    }

    



}

function deleteNote() {

    let arr = [];
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let lis = document.querySelectorAll(".notesList li");
    for(let i=0; i<checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            arr.push(i);
            console.log(arr);
            let li = lis[i];
            li.parentNode.removeChild(li);
        }
    }

    const dataObject = {
        arra: arr,
        count: arr.length
    };
    console.log(arr.length);
    const fetchObject = {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        } ,
        body: JSON.stringify(dataObject)
    };
    const url = "http://localhost:3000/";
    fetch(url+'usernotes.html', fetchObject) 
        .then(response => response.json())
        .then(jsonObject => {   
            console.log("deletion request");
            
        }); 
}

function start() {

    let newNoteBtn = document.querySelector("#newNote");
    let editNoteBtn = document.querySelector("#editNote");
    let deleteNoteBtn = document.querySelector("#deleteNote");

    newNoteBtn.addEventListener("click", newNote);
    editNoteBtn.addEventListener("click", editNote);
    deleteNoteBtn.addEventListener("click", deleteNote);

    const url = "http://localhost:3000/";
    
    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        }
        
    };
    
    fetch(url+'usernotes.html', fetchObject) 
        .then(response => response.json())
        .then(jsonObject => {   
            console.log("chicken");
            console.log(jsonObject);
            console.log(jsonObject[0]);
            console.log(jsonObject[1]);
            for(let element = 0; element<jsonObject.length; element++) {
                var ul = document.querySelector(".notesList");
                var li = document.createElement("li");
                var p = document.createElement("p");
                p.innerHTML = jsonObject[element];
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                li.appendChild(checkbox);
                li.appendChild(p);
                ul.appendChild(li);
                console.log("for loop");
            }
            noteCounter = document.querySelectorAll(".notesList li").length;
            console.log(noteCounter);
        });             

    
     




}
window.addEventListener("load", start);