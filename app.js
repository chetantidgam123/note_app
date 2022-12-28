console.log('notes app');
shownotes();
//if user add a note add it to localstorage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtext = document.getElementById('addtext');
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    console.log(addtitle.value);
    let myobj = {
        title : addtitle.value,
        text : addtext.value
    }
    notesobj.push(myobj)
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtext.value = ""
    addtitle.value = ""
    console.log(notesobj);
    shownotes();
})
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    let html = ""
    notesobj.forEach(function (element, index) {
        html += `
        <div class=" notecard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id = ${index} onclick="deletenote(this.id)" class="btn btn-primary">Deleate Note</button>
        </div>
        </div>

        `

    });
    let noteselm = document.getElementById('notes')
    if (notesobj.length != 0) {
        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `Nothing to show! "Add note from above notes section"`;
    }
}

//function to dlt note
function deletenote(index) {
    // console.log('i am deleting', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }

    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();

}

let search=document.getElementById('searchtext')
search.addEventListener("input",function(){
    let inputval=search.value.toLowerCase();
    // console.log("input event fired");
    let notecard = document.getElementsByClassName('notecard')
    Array.from(notecard).forEach(function(element){
        let cardtext=element.getElementsByTagName("p")[0].innerText
        // console.log(cardtext);
        if(cardtext.includes(inputval)){
            element.style.display="block"
        }
        else{
            element.style.display="none"

        }
    })
})