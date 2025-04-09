document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if (email === '' || password === '') {
        console.log('Por favor completar todos los campos.')
    }else if (email === 'test@gmail.com' && password === '12345678' ) {
        console.log('Inicio de sesion exitoso.')
    }else{
        console.log('Correo o contraseña incorrectos.')
    } 
})