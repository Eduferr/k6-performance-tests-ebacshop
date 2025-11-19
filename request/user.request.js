import http from 'k6/http';
import Utils from '../utils/utils';
import { check } from 'k6';

export default class User {
    list(token) {
        let response = http.get(`${Utils.getBaseUrl()}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        check(response, {
            'A listagem de usuários, retorna o código 200': r => r && r.status === 200
        })
    }
}