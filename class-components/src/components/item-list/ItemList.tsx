import type { ItemDisplay } from '../../types';
import Item from '../item/Item.tsx';
import './ItemList.scss';

function ItemList({ items }: Readonly<{ items: ItemDisplay[] }>) {
  return (
    <div className="item-list">
      {items.map((el: ItemDisplay) => (
        <Item key={el.name} item={el} />
      ))}
    </div>
  );
}


export default ItemList;
