import axios from 'axios';
import { Request, Response } from 'express';

const getRestaurants = async (lat: number, lng: number, radius: number) => {
    const query = `
      [out:json][timeout:30];
      node
        ["amenity"="restaurant"]
        (around:${radius},${lat},${lng});
      out body; 
    `;
    try {
        const response = await axios.post(
            'https://overpass-api.de/api/interpreter',
            query,
            {
                headers: { 'Content-Type': 'text/plain' },
                timeout: 15000, // 15 segundos
            }
        );

        if (!response.data || !response.data.elements) {
            throw new Error('No restaurant data found');
        }

        return response.data.elements;
    } catch (error: any) {

        console.error("Error details:");
        if (error.response) {

            console.error("HTTP Status Code:", error.response.status);
            console.error("Headers da Resposta:", error.response.headers);
            console.error("Dados da Resposta:", error.response.data);
        } else if (error.request) {

            console.error("Nenhuma resposta recebida. Detalhes do Request:", error.request);
        } else {
            console.error("Mensagem de Erro:", error.message);
        }

        throw new Error(`Erro ao obter restaurantes: ${error.message}`);
    }
};

getRestaurants(37.7749, -122.4194, 5000).then(console.log).catch(console.error);

export default {
    // Buscar restaurantes por localização
    async getRestaurantsByLocation(req: Request, res: Response) {
        const { lat, lng, radius } = req.query;

        if (!lat || !lng || !radius) {
            return res.status(400).json({
                status: 400,
                msg: 'Parâmetros de latitude, longitude e raio são obrigatórios',
            });
        }

        const latNum = parseFloat(lat as string);
        const lngNum = parseFloat(lng as string);
        const radiusNum = parseInt(radius as string, 10);

        if (isNaN(latNum) || isNaN(lngNum) || isNaN(radiusNum)) {
            return res.status(400).json({
                status: 400,
                msg: 'Parâmetros de latitude, longitude e raio devem ser numéricos válidos',
            });
        }

        try {
            const restaurants = await getRestaurants(latNum, lngNum, radiusNum);
            return res.status(200).json({
                status: 200,
                data: restaurants,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                msg: { error: error.message },
            });
        }
    },
};
