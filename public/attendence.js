
// console.log('hi')
const weekly = async () => {
    console.log('called')
    let result = await axios.get('/getweeklydata');
    console.log(result.data)
  

var doc = new jsPDF();
doc.text(50,(10), 'Your weekly Attendence Report')
result.data.lastseven.forEach(function(seven, i){
    i++;
    doc.text(50, 10 + (i * 10), 
        `${i}:` + seven 
       );
});

doc.save('weekly.pdf');
}
const monthly = async () => {
    console.log('called')
    let result = await axios.get('/getmonthlydata');
    console.log(result.data)
    var doc = new jsPDF();
doc.text(50,(10), 'Your Monthly Attendence Report')
result.data.lastthirty.forEach(function(thirty, i){
    i++;
    doc.text(50, 10 + (i * 10), 
        `${i}:` + thirty
       );
});
doc.save('monthly.pdf');
}

 var dateControl = document.querySelector('input[type="date"]');

var today = new Date();
//console.log(today.getDate(),
//today.getMonth()+1, //As January is 0.
//today.getFullYear())

let d1 = today.getDate();
let d2 = today.getMonth()+1; //As January is 0.
if(d2<10) {
    d2 = "0"+`${d2}`
}
let d3 = today.getFullYear()
if(d1<10) {
    d1 = "0"+`${d1}`
}



dateControl.value = `${d3}`+"-"+`${d2}`+"-"+`${d1}`;
//console.log(`${d3}`+"-"+`${d2}`+"-01")

document.getElementById('myform').addEventListener('submit',async (e) => {
   e.preventDefault();
    console.log('hi')
   // md.showNotification('top','right',
   // {title: 'themessage'})
 
  let result = await axios.get('/attendencerecords');
  console.log(result);
 // if(result.data)
 if(result.data.status == 'success'){
 if(result.data.recorded && result.data.recordednotf)
 {
    console.log('reached both')
    $.notify({
        // options
        message: "Your today's attendence is already recorded"
    },{
        // settings
        type: 'info'
    });
 }
 else if(result.data.recorded)
 {
    // console.log('got only recorded')
    window.location.reload()
 }
}
})


