import axios from 'axios';

export interface MovieQuote {
  quote: string;
  movie: string;
  year: number;
  character?: string;
}

/**
 * API pública de frases de películas
 * Usando dummyjson.com que tiene quotes genéricos
 */
const QUOTES_API = 'https://dummyjson.com/quotes';

/**
 * Obtener frases aleatorias
 */
export const getRandomQuotes = async (limit: number = 10): Promise<MovieQuote[]> => {
  try {
    const response = await axios.get(`${QUOTES_API}?limit=${limit}`);
    
    // Adaptar el formato de dummyjson a nuestro tipo MovieQuote
    return response.data.quotes.map((q: any) => ({
      quote: q.quote,
      movie: 'Unknown Movie',
      year: 2020,
      character: q.author,
    }));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return getFallbackQuotes();
  }
};

/**
 * Frases de respaldo si la API falla
 */
const getFallbackQuotes = (): MovieQuote[] => {
  return [
    {
      quote: 'Que la fuerza te acompañe',
      movie: 'Star Wars',
      year: 1977,
      character: 'Obi-Wan Kenobi',
    },
    {
      quote: 'Hasta el infinito y más allá',
      movie: 'Toy Story',
      year: 1995,
      character: 'Buzz Lightyear',
    },
    {
      quote: 'Voy a hacerle una oferta que no podrá rechazar',
      movie: 'El Padrino',
      year: 1972,
      character: 'Don Vito Corleone',
    },
    {
      quote: 'Siempre nos quedará París',
      movie: 'Casablanca',
      year: 1942,
      character: 'Rick Blaine',
    },
    {
      quote: 'Yo soy tu padre',
      movie: 'Star Wars: El Imperio Contraataca',
      year: 1980,
      character: 'Darth Vader',
    },
  ];
};

/**
 * Obtener una frase aleatoria
 */
export const getRandomQuote = async (): Promise<MovieQuote> => {
  const quotes = await getRandomQuotes(1);
  return quotes[0] || getFallbackQuotes()[0];
};