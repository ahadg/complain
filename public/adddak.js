console.log('added')
$('.ui.dropdown')
  .dropdown()
;




//$(document).ready(function(){
 // $('#search').keyup(function(){
  let mysearch = async () => {
    let theval = document.getElementById('search').value;
    console.log(theval);
    let result = await axios.post('/searchdak', {theval})
    console.log(result.data.result);
    // to delete old elements
    $('#bbody').html('');
    let theelement;
   // let d = result.data.result.Date;
   // d.getMonth();
  //  console.log(new Date(String(d)))
    result.data.result.forEach(el => {
     // let d = el.Date;
   // let d =  new Date(String(el.Date))
    let d = (moment( new Date(String(el.Date))).format('MMMM Do YYYY'))
    //let time = d.getDate();
   // console.log(`${d.getDay()},${d.getMonth()},${d.getFullYear()},${d.getUTCMonth()}`);
   let pic;

   if(el.dakregister == "Receive Register")
   {
     pic = 'inbox4'
   } 
   else if(el.dakregister == "Dispatch Register"){
pic = 'outbox4'
   }
   theelement += `<tr style="color: rgb(247, 238, 223); font-size: medium;font-weight: bold;text-align: center">  <td> <img
      style="width: 40px;height: 40px;
      "
      src=/assets/img/${pic}.png><br>  ${d}   </td>  <td>   ${el.sndorrecvr}  </td>  <td>  ${el.subject}  </td>  <td>    ${el.Department}  </td></tr>`
    });
   // $('#bbody').html('');
  //  let searchField = $('$search').val();
    //$('#bbody').append("<tr>  <td>  hi  </td>  <td>   hi  </td>  <td>  new issue  </td>  <td>    cs  </td></tr>")
  $('#bbody').append(theelement)
    //})
//})

  }
   


  


const savedak = async () => {
 let Department =  document.getElementById('selectdepart').value;
 let  Date = document.getElementById('thedate').value;
 let dakdirection = document.getElementById('selectdir').value;
 let dakregister = document.getElementById('selectreg').value;
 let sndorrecvr = document.getElementById('sendr').value;
 let subject = document.getElementById('subject').value;
 let body = {
  Department,Date,dakdirection,dakregister,sndorrecvr,subject
 }
 let result = await axios.post('/createdak', body);
// console.log(result);
 if(result.data.status == 'success')
 {
  window.location.reload()
 }
}