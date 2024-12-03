import axios from 'axios';
import { Request, Response } from 'express';

const getRestaurants = async (lat: number, lng: number, radius: number) => {
    const query = `
      [out:json][timeout:30]; // Define o formato de saída como JSON e aumenta o tempo de execução
      node
        ["amenity"="restaurant"]
        (around:${radius},${lat},${lng});
      out body; // Inclui dados detalhados no corpo
    `;
    try {
      const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
        headers: { 'Content-Type': 'text/plain' },
      });
      
      if (!response.data || !response.data.elements) {
        throw new Error('No restaurant data found');
      }
  
      return response.data.elements;
    } catch (error: any) {
      throw new Error(`Erro ao obter restaurantes: ${error.message}`);
    }
  };


export default {
  // Buscar restaurantes por localização
  async getRestaurantsByLocation(req: Request, res: Response) {
    const { lat, lng, radius } = req.query;

    // Check for required parameters
    if (!lat || !lng || !radius) {
      return res.status(400).json({
        status: 400,
        msg: 'Parâmetros de latitude, longitude e raio são obrigatórios',
      });
    }

    // Convert parameters to numbers and handle potential invalid values
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
