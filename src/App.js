import { useCallback, useState } from "react";
import { AutoComplete } from "./Autocomplete";
import { getProducts } from "./api";
import "./styles.css";

export default function App() {
  const [selectedData, setSeletedData] = useState({});

  const onSelect = useCallback((item) => {
    setSeletedData(item);
  }, []);
  return (
    <div className="App">
      {/* {selectedData && <p>{selectedData.title}</p>} */}
      <AutoComplete
        apiCall={getProducts}
        renderItem={(item) => {
          return <div className="item">{item.title}</div>;
        }}
        caching={true}
        onSelect={onSelect}
      />
    </div>
  );
}

/*
  <AutoComplete
    apiCall={} 
    renderItems={(item) => {
      return <div>{item}</div>
    }}
    caching={true}
    onSelect={(selectedValue) => {

    }}
  />
*/
