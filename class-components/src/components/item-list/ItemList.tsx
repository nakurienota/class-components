import type { ItemDisplay } from '../../types';
import Item from '../item/Item.tsx';
import './ItemList.scss';

function ItemList({ items, onItemClick }: Readonly<{ items: ItemDisplay[]; onItemClick: (name: string) => void  }>) {
  return (
    <div className="item-list">
      {items.map((el: ItemDisplay) => (
        <Item key={el.name} item={el} onClick={onItemClick} />
      ))}
    </div>
  );
}


export default ItemList;
