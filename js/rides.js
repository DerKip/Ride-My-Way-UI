//create a ride offer
document.getElementById('createRide').addEventListener('submit', createRideOffer);

function createRideOffer(event){   
    event.preventDefault();
    
    let destination = document.getElementById('destination').value;
    let myLocation = document.getElementById('myLocation').value;
    let departureTime = document.getElementById('departureTime').value;
    let price = document.getElementById('price').value;

    let error = document.getElementById('error');
    let success = document.getElementById('message');
    let status = '';

    if(window.localStorage.getItem('token') == ''){
        //redirect user to login page if he/she is not logged in
        window.location.href('index.html');
        }
    
    fetch('http://127.0.0.1:5000/api/v2/users/rides', { 
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        },
        body:JSON.stringify(
            {
                destination:destination,
                from_location:myLocation,
                departure_time:departureTime,
                price:price
        })
    }).then((res) => {
        status = res.status;
        return res.json();
    })  
    .then((data) => {
        if (status == 401){
            error.style.display='block';
            document.getElementById('error').innerHTML = data["msg"];     
        }
        if (status == 400 || status >401){
            error.style.display='block';
            document.getElementById('error').innerHTML = data["error"];     
        }
        if (status == 201 ){
            success.style.display= 'block';
            document.getElementById('message').innerHTML = data['message'];   
        }    
    })
    .catch((err)=>console.log(err))
}

