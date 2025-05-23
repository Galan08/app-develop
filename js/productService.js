function products(page) {
    document.getElementById('cardHeader').innerHTML = '<h5> Listado de productos </h5>'

    const REQRES_ENDPOINT = 'https://reqres.in/api/products?page=' + page
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((response) => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        info: data
                    }
                }
            )
        })
        .then((result) => {
            console.log('resultado', result)
            if (result.status === 200) {
                let listProducts = `
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Año</th>
                    <th scope="col">Color</th>
                    <th scope="col">Acción</th>                                        
                    </tr>
                </thead>
            <tbody>
            `;
                result.info.data.forEach(element => {
                    listProducts = listProducts + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.year}</td>
                    <td><input type="color" id="head" name="head" value="${element.color}" /></td>
                    <td><button type="button" class="btn btn-outline-info" onclick="getProduct('${element.id}')">Ver</button></td>
                </tr>
                `
                });
                listProducts = listProducts + `
                </tbody>
            </table>
            `
                document.getElementById('info').innerHTML = listProducts
            }
            else {
                document.getElementById('info').innerHTML = 'No existen productos en la BD'
            }
        })
}

function getProduct(idProduct) {
    const REQRES_ENDPOINT = 'https://reqres.in/api/products/' + idProduct
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
    })

    .then((result) => {
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data

                }
            }
        )
    })

    .then((response) => {
        if (response.status === 200) {
            const product = response.body.data
            const modalProduct = `
                <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Informacion del producto</h5>
                                    <td><input type="color" id="head" name="head" value="${product.color}" /></td>
                                    <p class="card-text"> Nombre: ${product.name} </p>
                                    <p class="card-text"> Año: ${product.year} </p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            `
            document.getElementById('viewModal').innerHTML = modalProduct
                const modal = new bootstrap.Modal(
                    document.getElementById('modalProduct')
                )
                modal.show()
            }
            else {
                document.getElementById('info').innerHTML = '<h3> No se encontro el producto en la api</h3>'
            }
        })
}