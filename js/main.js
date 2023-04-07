var nameInput = document.querySelector('#bName');
var siteInput = document.querySelector('#siteUrl');
var addBtn = document.querySelector(' main button');
var tableBody = document.querySelector(' #tableBody');
var bookMarks = [];

if (localStorage.getItem('Bookmarks') == null) {
    var productContanier = []
} else {
    bookMarks = JSON.parse(localStorage.getItem('Bookmarks'));
    console.log(bookMarks)
    display()
}
var nameRegex = /^[A-Za-z_]{1,}$/
function validName(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }else{
        return false;
    }
}
var urlRegex = /^(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
function validUrl(){
    if(urlRegex.test(siteInput.value)){
        return true;
    }else{
        return false;
    }
}
nameInput.onkeyup = function(){
    if(validName() && validUrl()){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.disabled = "true";
    }
}
siteInput.onkeyup = function(){
    if(validName() && validUrl()){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.disabled = "true";
    }
}
addBtn.onclick = function () {
    var bookMark = {
        name: nameInput.value,
        url: siteInput.value,
    }
    bookMarks.push(bookMark);
    localStorage.setItem('BookMarks',JSON.stringify(bookMarks));
    display()
    clearData()

}
function clearData(){
    nameInput.value ="";
    siteInput.value ="";
}


function display() {
    var trs = ``;
    for (i = 0; i < bookMarks.length; i++) {
        trs += `
    <tr>
        <td>${bookMarks[i].name}</td>
        <td><a href="https://${bookMarks[i].url}"><button class="btn btn-primary">Visit</button></a></td>
        <td><button onclick="delte(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
    `
    }
    tableBody.innerHTML = trs
}

function delte(bookIndex){
    bookMarks.splice(bookIndex,1);
    localStorage.setItem('BookMarks', JSON.stringify(bookMarks));
    display()
}