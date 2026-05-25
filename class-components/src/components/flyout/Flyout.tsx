import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks.ts';
import { clearSelectedItems } from '../../redux/stores/PokemonStore.ts';

import './Flyout.scss';

function Flyout() {
  const appDispatcher = useAppDispatch();

  const selectedItems = useAppSelector(state => state.pokemons.selectedItems) ?? [];

  if (selectedItems.length === 0) return null;

  const handleUnselectAll = () => {
    appDispatcher(clearSelectedItems());
  };

  const handleDownload = () => {
    const data = JSON.stringify(selectedItems, null, 2);
    const blob = new Blob([data], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'selected-items.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout">
      <div className="flyout__info">Selected: <b>{selectedItems.length}</b></div>
      <div className="flyout__actions">
        <button onClick={handleUnselectAll}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default Flyout;