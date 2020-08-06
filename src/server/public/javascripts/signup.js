
document.querySelector('#submit_signup').addEventListener('click', (event) => {
    event.preventDefault();

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username,
            password: password
        })
    })
    .then((res) => {
        if(res.status !== 200){
            throw "can't create user!";
        }
    })
    .catch((e) => console.log(e));
}) 