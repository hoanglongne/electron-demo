const toggleMenuButton = document.querySelector('.toggle-menu-button')

const menuItems = document.querySelectorAll('.popup-item')

let globValues;

toggleMenuButton.addEventListener('click', ()=> {
    menuItems.forEach((menuItem)=> {
        menuItem.classList.toggle('visible')
})
})

window.indexBridge.getDataBack((_event, values)=>{
const thing = document.getElementById("placetopass");
globValues = values

values.forEach((value)=> {
    const html = `
    <div data-conv=${value.convID} class="chat-head-container">
        <div class="avatar-container">
            <img src=${value.avatar} alt="">
        </div>
        <div class="text-container">
            <div>
                <h5>${value.username}</h5>
                <span>${value.message[0].timestamp.slice(0,5)}</span>
            </div>
            <p>${value.message[0].content}</p>
        </div>
    </div>`

    thing.insertAdjacentHTML('afterend',html)
})
})

// document.querySelectorAll('.chat-head-container').forEach((conv) => {
//     console.log(conv)
//     conv.addEventListener('click', () => {
//         const convID = conv.getAttribute('data-conv')
//     })
// })

document.addEventListener("click", function(e){
    const target = e.target.closest(".chat-head-container"); // Or any other selector.
    const username = document.getElementById('username')

    if(target){
        const convID = target.getAttribute('data-conv')
        const result = globValues.find(user => user.convID === convID);
        username.innerText = result.username
    }



  });