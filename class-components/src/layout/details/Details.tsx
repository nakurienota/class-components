import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { PokemonDetails } from '../../types';
import Spinner from '../../components/spinner/Spinner.tsx';

function DetailsPage() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!name) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (res.ok) {
          const data = await res.json();
          setPokemon(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [name]);

  if (isLoading) return <Spinner />;
  if (!pokemon) return null;

  return (
    <div className="details">
      <h2>{pokemon.name}</h2>
      <p>Base experience: {pokemon.base_experience}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}

export default DetailsPage;