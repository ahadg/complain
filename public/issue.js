console.log('issuees')
//console.log(document.getElementById('selectuser').value)

let issuefun  = async () => {
 let theuser =     (document.getElementById('selectuser').value);
 if(theuser == 'Select the user')
 {
     theuser = ""
 }
 let issued = document.getElementById('issued').value;
 console.log(theuser);
 let result = await axios.post('/createissue', {theuser, issued});
 console.log(result)
 if(result.status == 200)
 {
   window.location.href = "http://localhost:5000/allissuepage"
 }
}

let searchwithcnic = async () => {
    let val = document.getElementById('ssearch').value;
    let theelements;
    let res = await axios.post('/searchcnic', {val})
  let users = res.data.theuser;
  $('#bbody').html('');
     for(let i=0; i<users.length; i++) {
        
        if(users[i].issues.length > 0) {
        for(let j=0; j<users[i].issues.length; j++) { 
              
 theelements += `<tr style="color: rgb(247, 238, 223); font-size: medium;font-weight: bold;text-align: center;"> 
     <td > <img
    style="width: 40px;height: 40px;
    "
    src=/assets/img/${users[i].issues[j].status}.png><br>  ${users[i].issues[j].status}  </td>  
    
    <td>   ${users[i].issues[j].issueid} </td> 
     <td>  ${
      (new Date(String(users[i].issues[j].issuedate))).toLocaleString()} </td>
      <td>    ${users[i].issues[j].issuedetails} </td>
    <td> ${users[i].name}  </td>
    </tr>`
     }
     }
       }
       $('#bbody').append(theelements)
   // console.log(res);
   // console.log('checktiming');
}

let issueid1;

  let callus = (issueid,user) => {
   issueid1 = issueid
   console.log(issueid1)
  }

  let callus2 = async () => {
  let user = document.getElementById('selectuser').value;
  console.log(issueid1,user)
  let result = await axios.post('/assignissue', {
    issueid1,
    user
  })
  console.log(result)
  if(result.data.status == 'success')
  {
    window.location.reload();
  }
  }

  let updatestatus =async (id) => {
    console.log(id);
    let result = await axios.post('/updatestatus', {
      id
    })
   // console.log(result);
    if(result.data.status == 'success')
    {
      window.location.reload();
    }
  }
