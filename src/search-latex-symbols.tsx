import { Grid } from "@raycast/api";
import { useState } from "react";
import { SymbolsSection } from "./components";
import { SymbolItem } from "./components/symbol-item";
import { symbols } from "./constants";

export default function Command() {
  const [columns, setColumns] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Grid
      columns={columns}
      inset={Grid.Inset.Large}
      isLoading={isLoading}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Grid Item Size"
          storeValue
          onChange={(newValue) => {
            setColumns(parseInt(newValue));
            setIsLoading(false);
          }}
        >
          <Grid.Dropdown.Item title="Large" value={"3"} />
          <Grid.Dropdown.Item title="Medium" value={"5"} />
          <Grid.Dropdown.Item title="Small" value={"8"} />
        </Grid.Dropdown>
      }
    >
      {!isLoading &&
        Object.entries(symbols).map(([group, { symbols, ...other }]) => (
          <SymbolsSection
            key={group}
            title={group}
            subtitle={symbols.length.toString()}
            columns={other.layout?.columns || 8}
          >
            {symbols.map((symbol) => (
              <SymbolItem key={symbol.syntax} symbol={symbol} />
            ))}
          </SymbolsSection>
        ))}
    </Grid>
  );
}
