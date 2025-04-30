document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
})

function login(email, password) {
    let message = ''
    let alerttype = ''
    const REQRES_ENDPOINT = 'https://reqres.in/api/login'
    fetch(REQRES_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.status === 200) {
                alerttype = 'success'
                message = 'Inicio de sesión exitoso'
                alertBuilder(alerttype, message)
                localStorage.setItem('token', "qwerty")
                setTimeout(() => {
                    location.href = 'admin/dashboard.html'
                }, 2000 )
            }
            else {
                alerttype = 'danger'
                message = 'Correo o contraseña inválidos'
            }
            console.log('respuesta de servicio', response)
            alertBuilder(alerttype, message)

        })
        .catch((error) => {
            alerttype = 'danger'
            message = 'Ocurrio un error inesperado'
            console.log('error de servicio', error)
            alertBuilder(alerttype, message)
        })

}

function alertBuilder(alerttype, message) {
    const alert = `
                <div class="alert alert-${alerttype} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`

    document.getElementById('mensaje').innerHTML = alert

}