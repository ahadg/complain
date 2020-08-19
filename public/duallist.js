


console.log('created')
//function getSelectValues(select) {
 //   var result = [];
 //   var options = select && select.options;
 //   var opt;
  
 //   for (var i=0, iLen=options.length; i<iLen; i++) {
  //    opt = options[i];
  
//      if (opt.selected) {
  //      result.push(opt.value || opt.text);
   //   }
   // }
   // return result;
  //}

            dlb1 = new DualListbox('.select1');

            const list = async () => {
               let val =  document.getElementById('select1');
          //     console.log(val[2].text)
          var result = [];
 //   var options = select && select.options;
    var opt;
  
   for (var i=0, iLen=val.length; i<iLen; i++) {
      opt = val[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }  
     
         // console.log(val);
         //       console.log($('#select1').val());
            }
            console.log(result)
            let message = document.getElementById('mess').value;
            console.log(message)
    let thereponse = await axios.post('/sendsmsall',
    {
      result,
      message
    } )
    if(thereponse.data.status == 'success')
    {
      $.notify({
        // options
        message: "Sms successfully sended"
    },{
        // settings
        type: 'info'
    });
    }
            }

          
            
            