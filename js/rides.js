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
            window.location = 'all_ride_offers.html'; 
        }    
    })
    .catch((err)=>console.log(err))
}

// fetch all ride offers

// Checks whether the href contains users/ride (regex way)

if (location.href.match(/all_ride_offers/)){
    fetch('http://127.0.0.1:5000/api/v2/users/rides',{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        }
    })
    .then((res) => {
    status = res.status;
    return res.json();
    })  
    .then((data =>{
        if (status == 401){
            alert(data['msg'] + '. Click Ok to login');
            window.location.replace('index.html');
        }
        if (data['rides'] == ''){
            table = document.getElementById('ResponsiveTable');
            table.style.display = 'none';
            alert('There are no ride offers currently available');
    
        }
        if (status == 200){
            let output = '';
            data['rides'].forEach(ride => {
                output +=`

                    <tr>
                        <td tableHeadData="id">${ride.id}</td>
                        <td tableHeadData="Driver">${ride.created_by}</td>
                        <td tableHeadData="From">${ride.from_location}</td> 
                        <td tableHeadData="To:">${ride.destination}</td>
                        <td tableHeadData="Departure time">${ride.departure_time}</td>    
                        <td tableHeadData="Date">${ride.date_created.slice(0, 17)}</td>          
                        <td><button onclick="viewRide(${ride.id})">View</button></td>
                    </tr>
                ` 
                document.getElementById('ride_offers').innerHTML = output;
            });
        }
        
    }))
}

//view ride offer details   
function viewRide(ride){
    fetch(`http://127.0.0.1:5000/api/v2/users/rides/${ride}`,{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        }
    })
    .then((res) => {
        status = res.status;
        return res.json();
        })  
        .then((data =>{
            if (status == 401){
                alert(data['msg'] + '. Click Ok to login');
                window.location.replace('index.html');
            }
            if (status == 200){
                //store ride details on local storage on success
                window.localStorage.setItem('creator', data.ride.created_by);
                window.localStorage.setItem('from_location', data.ride.from_location);
                window.localStorage.setItem('destination', data.ride.destination);
                window.localStorage.setItem('departure_time', data.ride.departure_time);
                window.localStorage.setItem('car', data.car.model);
                window.localStorage.setItem('car_plate', data.car.plate);
                window.localStorage.setItem('contact', data.contact);
                window.localStorage.setItem('ride',data.ride.id);
            //redirect user to view offer page
            window.location.replace('view_offer.html');
            }
    
        }));
    }

//displays ride details from local storage if url has 'view_offer'
if (location.href.match(/view_offer/)){
    let output ='';
    output+=`
        <p><strong>Driver :</strong>${window.localStorage.getItem('creator')}</p>
        <p><strong>From :</strong>${window.localStorage.getItem('from_location')}</p>
        <p><strong>To :</strong>${window.localStorage.getItem('destination')}</p>
        <p><strong>Time :</strong>${window.localStorage.getItem('departure_time')}</p>
        <p><strong>Car :</strong>${window.localStorage.getItem('car')}</p>
        <p><strong>Car NoPlate :</strong>${window.localStorage.getItem('car_plate')}</p>
        <p><strong>Contact :</strong>${window.localStorage.getItem('contact')}</p><br>
        <button formaction="tel:'${window.localStorage.getItem('contact')}'"> Call</button>&nbsp; 
        <button onclick="sendRequest(${window.localStorage.getItem('ride')})">Join Ride</button> 
        `;
    document.getElementById('RideDetails').innerHTML = output;
}
 
//send request to ride offer
function sendRequest(ride){
    fetch(`http://127.0.0.1:5000/api/v2/users/rides/${ride}/request`,{
        method:'POST',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        }
    })
    .then((res)=>{
        status = res.status;
        return res.json();
    })
    .then((data =>{
        if (status == 401){
            alert(data['msg'] + '. Click Ok to login');
            window.location.replace('index.html');
        }
        if(status == 405){
            alert(data['error']);
        }
    }));
}

   