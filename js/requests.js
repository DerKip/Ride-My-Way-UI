// Get requests of a ride
if (location.href.match(/requests/)){
    let output ='';
    output+=`
    <tr>
        <td></td>
        <td>${window.localStorage.getItem('passenger')}</td>
        <td> <a href="tel:${window.localStorage.getItem('contact')}">${window.localStorage.getItem('contact')}</a></td>
        <td>${window.localStorage.getItem('from')}</td> 
        <td>${window.localStorage.getItem('to')}</td>
        <td>${window.localStorage.getItem('departure_time')}</td>
        <td>${window.localStorage.getItem('date_created')}</td>
        <td><button onclick="acceptRequest() "id="">Accept</button></td>
        <td><button style="background: #d32f2f;"id="">Reject</button></td>                
    </tr> 
     `;
    document.getElementById('Requests').innerHTML = output;
    
}