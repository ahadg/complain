console.log('thelogin')
const login =async () => {
    //e.preventDefault();
    
  let usname = document.getElementById('uname').value;
   let password = document.getElementById('pass').value;
let body = {
    usname,password
}
   let result =await axios.post('/verifylogin', {
     body
   });
   console.log(result)
   if(result.data.status == "Error")
   {
    $.notify({
        // options
        message: result.data.msg
    },{
        // settings
        type: 'danger'
    });
   }
   else if (result.data.status == "success")
   {
    window.location.href = "http://localhost:5000/getattendence"
   }
}