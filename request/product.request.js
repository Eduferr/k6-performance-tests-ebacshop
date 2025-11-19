import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils";

// Classe Product, responsável pelas operações relacionadas a produtos
export default class Product {

    // Método para listar produtos, recebendo o token de autenticação
    list(token) {

        // Realiza a requisição GET para o endpoint /products
        const response = http.get(`${Utils.getBaseUrl()}/products`,
            {
                // Envia os headers necessários para a requisição
                headers: {
                    Authorization: `Bearer ${token}`// Token de autenticação no formato Bearer
                }
            });

        // Valida o resultado da requisição
        check(response, {
            'A listagem de produtos retorna o código 200': r => r && r.status === 200
        });
    }
}
