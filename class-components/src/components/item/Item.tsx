import type { ItemDisplayProperties } from '../../types';
import './Item.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks.ts';
import { addSelectedItem } from '../../redux/stores/PokemonStore.ts';

function Item({ item, onClick }: Readonly<ItemDisplayProperties>) {
  const { name, description } = item;
  const appDispatcher = useAppDispatch();

  const isSelected = useAppSelector(state =>
    state.pokemons.selectedItems.some(i => i.name === name),
  );

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    appDispatcher(addSelectedItem(item));
  };

  const handleClick = () => {
    onClick?.(name);
  };

  return (
    <div className="item" onClick={handleClick}>
      <div className="item__text">
        <p>{name}</p>
        <p>{description}</p>
      </div>
      <input type="checkbox" checked={isSelected} onChange={handleCheckbox} onClick={e => e.stopPropagation()} />
    </div>
  );
}

export default Item;
