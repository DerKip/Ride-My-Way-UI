//signup (without car) 
document.getElementById('postData').addEventListener('submit', postData);

function postData(event){
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let contact = document.getElementById('contacts').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let error = document.getElementById('error');
    let status = '';
    
    fetch('http://127.0.0.1:5000/api/v2/auth/signup', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(
            {
                username:username,
                email:email,
                contact:contact,
                password:password,
                confirm_password:confirmPassword
        })
    }).then((res) => {
        status = res.status;
        return res.json();
    })
    
    .then((data) => {
        if (status >= 400){
            error.style.display='block';
            document.getElementById('error').innerHTML = data["error"];
            
        }
        if (status == 201 ){
            window.location = 'index.html'
            success.style.display= 'block'
            document.getElementById('message').innerHTML = data['message']
            
        }
        
    })
    .catch((err)=>console.log(err))
}