import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/users.json'
import User from '../request/user.request';
import Product from '../request/product.request';
import Customer from '../request/clients.request';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 },
    ],
    "thresholds": {
        "http_req_duration": ["p(99)<10000"]
    }
}

export default function () {

    let login = new Login()
    let user = new User()
    let product = new Product()
    let customer = new Customer()

    group('Efetuar login para obter o token', () => {
        login.access(data.userData.user, data.userData.pass)
    })

    group('Listar Usuários', () => {
        user.list(login.getToken())
    })

    group('Listar Produtos', () => {
        product.list(login.getToken())
    })

    group('Listar Clientes', () => {
        customer.list(login.getToken())
    })
}