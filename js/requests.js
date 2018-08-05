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
                    <td><button onclick="acceptRequest(${res.id})>Accept</button></td>
                    <td><button onclick="rejectRequest(${res.id})style="background: #d32f2f;"id="">Reject</button></td>                
                </tr> 
                ` 
            document.getElementById('Requests').innerHTML = output;
            });
        }   
    }))
}