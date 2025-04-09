document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    alert('Estos son tus datos: email: ' + email + ' pass: ' + password)
})