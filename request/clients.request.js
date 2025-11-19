import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils"

// Classe Customer, responsável por operações relacionadas a clientes
export default class Customer {

    // Método para listar clientes, recebendo o token de autenticação
    list(token) {

        // Realiza a requisição GET para o endpoint /customers
        const response = http.get(`${Utils.getBaseUrl()}/customers`,
            {
                // Envia os headers necessários para a requisição
                headers: {
                    Authorization: `Bearer ${token}`// Token de autenticação no formato Bearer
                }
            })

        // Valida o resultado da requisição
        check(response, {
            'A listagem de clientes retorna o código 200': r => r && r.status === 200
        })
    }
}
