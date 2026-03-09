console.log('connected')
//login page
const username = document.getElementById('username')
const password = document.getElementById('password')
const loginbtn = document.getElementById('loginbtn')
    loginbtn.addEventListener('click',function(){
    if( username.value === 'admin' && password.value === 'admin123'){
        window.location.href = './main.html'
    }
    else{
        alert('try again')
        username.value = ''
        password.value = ''
    }
})