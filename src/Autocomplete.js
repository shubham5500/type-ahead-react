import { useEffect, useState } from "react";
import { debounce, useDebounce } from "./utils";

export const AutoComplete = ({ apiCall, renderItem, caching, onSelect }) => {
  const [apiData, setApiData] = useState([]);

  const [cache, setCache] = useState({});
  const [input, setInput] = useState([]);

  const { debouncedValue } = useDebounce(input, 300);
  const onSelectItem = (item) => {
    onSelect(item);
    setInput(item.title);
    setApiData([]);
  };
  useEffect(() => {
    if (debouncedValue.length) {
      (async () => {
        if (cache[debouncedValue] && caching) {
          setApiData(cache[debouncedValue]);
          return;
        }
        const data = await apiCall(debouncedValue);
        if (caching) {
          const cacheData = {
            ...cache,
            [debouncedValue]: data.products
          };
          setCache(cacheData);
        }
        setApiData(data.products || []);
      })();
    } else {
      setApiData([]);
      onSelect({});
    }
  }, [debouncedValue, apiCall, cache, caching]);

  return (
    <div className="wrapper">
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button
          onClick={() => {
            setInput("");
            setApiData([]);
            onSelect({});
          }}
        >
          Clear
        </button>
      </div>
      {apiData.length > 0 && (
        <div>
          {apiData.map((item, idx) => {
            return (
              <div onClick={() => onSelectItem(item)} key={item.id}>
                {renderItem(item, idx)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
