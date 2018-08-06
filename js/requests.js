if (location.href.match(/requests/)){
    fetch(`http://127.0.0.1:5000/api/v2/users/rides/${window.localStorage.getItem('ride_requests')}/requests`,{
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
        if (status >= 400){
            alert(data.error);
        }
        if (status == 200){
            let output = '';
            var i = 0;
            data.response.forEach(res => {
                i++;
                output +=`
                <tr>
                    <td>${i}</td>
                    <td>${res.username}</td>
                    <td><a href="tel:${res.contact}">${res.contact}</a></td>

                    <td><input onclick="this.value='Accepted'" type="button" value="Accept"
                        style="background:#1c7f7f;color: #fff;
                            padding:10px;
                            border-radius: 4px;
                            border: 0;
                            cursor: pointer;">
                    </td>

                    <td><button onclick="rejectRequest(${res.ride_id},${res.id})" style="background: #d32f2f;" >Reject</button></td>                
                </tr> 
                ` ;
            document.getElementById('Requests').innerHTML = output;
            });
        }   
    }))
}

//Accept Request
function acceptRequest(ride,request){  
    let state = "Accepted";
    fetch(`http://127.0.0.1:5000/api/v2/users/rides/${ride}/requests/${request}`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json',
                'Authorization':'Bearer '+ window.localStorage.getItem('token')
            },
            body:JSON.stringify(
                {
                   Response:state
            })
        })
        .then((res) => {
            status = res.status;
            return res.json();
        })  
        .then((data) => {
            if (status >= 400){
                alert(data.error);   
            }
            if (status == 200 ){
                alert('accepted');
            }    
        })
        .catch((err)=>console.log(err));
}    

//Accept Request
function rejectRequest(ride,request){  
    let state = "Rejected";
    fetch(`http://127.0.0.1:5000/api/v2/users/rides/${ride}/requests/${request}`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json',
                'Authorization':'Bearer '+ window.localStorage.getItem('token')
            },
            body:JSON.stringify(
                {
                   Response:state
            })
        })
        .then((res) => {
            status = res.status;
            return res.json();
        })  
        .then((data) => {
            if (status >= 400){
                alert(data.error);   
            }
            if (status == 200 ){
                alert('Rejected');
            }    
        })
        .catch((err)=>console.log(err));
}    