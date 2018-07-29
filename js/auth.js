//signup (without car) 
document.getElementById('signUp1').addEventListener('submit', signupWithoutCar);

function signupWithoutCar(event){   
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let contact = document.getElementById('contacts').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let error = document.getElementById('error');
    let success = document.getElementById('message');
    let status = '';
    
    fetch('https://ride-my-way-2.herokuapp.com/api/v2/auth/signup', {
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
            window.location = 'index.html';
            success.style.display= 'block';
            document.getElementById('message').innerHTML = data['message'];   
        }    
    })
    .catch((err)=>console.log(err))
}


//signup (with car) 
document.getElementById('signUp2').addEventListener('submit', signupWithCar);

function signupWithCar(event){   
    event.preventDefault();
    
    let username = document.getElementById('username2').value;
    let email = document.getElementById('email2').value;
    let contact = document.getElementById('contacts2').value;
    let car_regno= document.getElementById('car_regno').value;
    let car_model = document.getElementById('car_model').value;
    let password = document.getElementById('password2').value;
    let confirmPassword = document.getElementById('confirmPassword2').value;

    let error = document.getElementById('error');
    let success = document.getElementById('message');
    let status = '';
    
    fetch('https://ride-my-way-2.herokuapp.com/api/v2/auth/signup', { 
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(
            {
                username:username,
                email:email,
                contact:contact,
                car_regno:car_regno,
                car_model:car_model,
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
            success.style.display= 'block';
            document.getElementById('message').innerHTML = data['message'];
        }
    })
    .catch((err)=>console.log(err))
}


//Login
document.getElementById('login').addEventListener('submit', loginUser);

function loginUser(event){   
    event.preventDefault();

    let username = document.getElementById('visitor').value;
    let password = document.getElementById('password_login').value;
   
    //declare error,messages and status variables to be used (user interaction)
    let error = document.getElementById('error');
    let success = document.getElementById('message');
    let status = '';
    
    fetch('https://ride-my-way-2.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(
            {
                username:username,
                password:password
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
        if (status == 200 ){
            success.style.display= 'block';
            document.getElementById('message').innerHTML = data['message'];
            //store access_token to web local storage
            window.localStorage.setItem('token', data.token);
            //redirect user to  all ride offers available
            // window.location = 'all_ride_offers.html'; 
        }    
    })
    .catch((err)=>console.log(err))
}
