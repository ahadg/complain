console.log('file')
let deletemycookie = () => {

    document.cookie = "jwt=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
 window.location.href = "http://localhost:5000/loginme"
}