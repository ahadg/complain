console.log('hi')


document.getElementById("button-a").addEventListener("click", async () => {
  
    let result = await axios.get('/getcontactdata'); 
    console.log(result);
    console.log(result.data.data)
    
    var doc = new jsPDF();
    result.data.data.forEach(function(employee, i){
        doc.text(10, 10 + (i * 10), 
       
          " uname:" + employee.username +
            " name:" + employee.name +
            " cnumber:" + employee.cnumber +
            " cnic:" + employee.cnic 
            
            );
    });

    doc.save('Test.pdf');

})
/*var wb = XLSX.utils.book_new();
wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017,12,19)
};

wb.SheetNames.push("Test Sheet");
var ws_data = [['hello' , 'world']];
const data = [{name:"ahad", number :'23523'},
{name:"imran", number :"553442"},{name:"aqib", number : "23532"}];

var ws = XLSX.utils.json_to_sheet(data);
//var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
function s2ab(s) {

        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
        
}
$("#button-a").click(function(){
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
});
*/
/*var employees = [
    {"firstName":"utsav", "lastName":"Maniyar"}, 
    {"firstName":"heta", "lastName":"yadav"},
    {"firstName":"run", "lastName":"run"}
];

var doc = new jsPDF();
employees.forEach(function(employee, i){
    doc.text(50, 10 + (i * 10), 
        "First Name: " + employee.firstName +
        "Last Name: " + employee.lastName);
});
*/
//doc.save('Test.pdf');



document.getElementById("thebutton").addEventListener("click", async () => {
  /*  alert('hi')
    const data = [{ "foo": "foo",
     "foo2" :"yoo",
    "foo3" : "tt"

}, { "bar": "bar" }]
    const fileName = 'download'
    const exportType = 'pdf'
 // you can see exportfromjson object in window global
    window.exportFromJSON({ data, fileName, exportType })
})
let callme = () => {
    alert('y')
    const data = [{ foo: 'foo'}, { bar: 'bar' }]
    const fileName = 'download'
    const exportType = 'csv'
 // you can see exportfromjson object in window global
    window.exportFromJSON({ data, fileName, exportType }) */

    let result = await axios.get('/getcontactdata'); 
    console.log(result);
    console.log(result.data.data)
    var wb = XLSX.utils.book_new();
wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017,12,19)
};

wb.SheetNames.push("Test Sheet");


var ws = XLSX.utils.json_to_sheet(result.data.data);
//var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
function s2ab(s) {

        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
        
}

        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');


})







document.getElementById('myform').addEventListener('submit',async (e) => {
    e.preventDefault();
    const cnumber  = document.getElementById('cnumber').value;
    const cnic = document.getElementById('cnicnum').value;
    const name = document.getElementById('name').value;
    const username = document.getElementById('uname').value;
    const smstype = document.getElementById('smstype').value;
    const password = document.getElementById('mpassword').value;
    console.log(cnumber,cnic,name,smstype)
    const check = document.getElementsByClassName('checks');
    let str = '';
    if(!cnumber || !cnic || !name || !username || !smstype || !password || !check)
    {
        $.notify({
            // options
            message: "please input all fields"
        },{
            // settings
            type: 'danger'
        });
    }
   // console.log(check);
    for ( let i=0 ; i< 9; i++) 
    {
        if (check[i].checked)
        {
           // console.log(check[i].value)
            str = str + check[i].value + " ";
        }
        
    }
    console.log(str)
    
   const Department = document.getElementById('selectdepart').value;
   let Group = str;

   let body = {
       cnumber,cnic,name,smstype,Group,Department,username,password
   }
   if(str.includes('admin'))
    {
        body.role = 'admin';
    }
    else if(str.includes('clerk'))
    {
        body.role = 'clerk'
    }
  console.log(body)
 let result = await axios.post('/savecontact',body);
 console.log(result)
 if(result.data.status == 'error')
 {
    $.notify({
        // options
        message: "A username,cnic or phone number already exist"
    },{
        // settings
        type: 'danger'
    });
 }
 else if(result.statusText == "Created")
 {
    $.notify({
        // options
        message: "User created"
    },{
        // settings
        type: 'success'
    });
 }
 
})