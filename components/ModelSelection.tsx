"use client";

import useSwR from "swr";
import Select from "react-select";

// Creating Fetcher Function To getEngines JSON Data
const fetchModels = () => fetch("api/getEngines").then((res) => res.json());

function ModelSelection() {
  // useSwR('models', fetcher function) --> 'models' can be any key
  const { data: models, isLoading } = useSwR("models", fetchModels);

  // Similar to useState --> to do caching or default select
  const { data: model, mutate: setModel } = useSwR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
