
const main = document.querySelector('.main');
const Body = document.querySelector('body')
const inputBox = document.getElementById('userInput');
const logButton = document.getElementById('searchBtn');

// Add event listener to the button
logButton.addEventListener('click', function (e) {
    e.preventDefault()
    checkInput()
});

inputBox.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        checkInput()
    }
});

let checkInput= function(){
    if(inputBox.value != ""){
        let userInputValue = inputBox.value
    
        getData(userInputValue)
    }
    else{
        console.log("enter input");
    }
}
let getData = function(userInputValue){
    let  url = 'https://api.github.com/users/'
    let requestUrl = url + userInputValue 
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl)
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
         if (xhr.readyState === 4) {
            const data = JSON.parse(this.responseText)
            showCard(data)
        }
    }
    xhr.send();
}

const showCard = function (data) {
    main.innerHTML = " "
    main.innerHTML = `
        <section class="main">
            <div class="profile-card">
                <div class="image">
                    <img id="dynamicImage" alt="" class="profile-pic">
                </div>
                <div class="data">
                     <h2 id="username"></h2>
                     <span id="bio">Developer & Designer</span>
                </div>
                 <div class="row">
                    <div class="info">
                        <h3>Followers</h3>
                        <span id="followers">5000</span>
                    </div>
                    <div class="info">
                        <h3>Following</h3>
                        <span id="following">120</span>
                    </div>
                    <div class="info">
                        <h3>Repos</h3>
                        <span id="repos">10</span>
                    </div>
                </div>
                <div class="buttons">
                    <a href="#" class="btn btnGitHub">GitHub</a>
                </div>
            </div>
        </section>
    `
    addDataInCard(data)
}


const addDataInCard = function (data) {
    document.getElementById('dynamicImage').src = data.avatar_url;
    document.getElementById('bio').innerText = data.bio;
    document.getElementById('username').innerText = data.name;
    document.getElementById('following').innerText = data.following;
    document.getElementById('followers').innerText = data.followers;
    document.getElementById('repos').innerText = data.public_repos;
    document.querySelector('.btnGitHub').href = data.html_url
}
