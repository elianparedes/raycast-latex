import { Grid } from "@raycast/api";
import { useState } from "react";
import { SymbolsSection } from "./components";
import { SymbolItem } from "./components/symbol-item";
import { symbols } from "./constants";

export default function Command() {
  const [group, setGroup] = useState<"All" | keyof typeof symbols>("All");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Grid
      inset={Grid.Inset.Large}
      isLoading={isLoading}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Filter"
          storeValue
          onChange={(newValue) => {
            setGroup(newValue);
            setIsLoading(false);
          }}
        >
          {["All", ...Object.keys(symbols)].map((key) => (
            <Grid.Dropdown.Item key={key} value={key} title={key} />
          ))}
        </Grid.Dropdown>
      }
    >
      {!isLoading &&
        Object.entries(symbols)
          .filter(([g]) => {
            if (group === "All") return true;
            return g === group;
          })
          .map(([group, { symbols, ...other }]) => (
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
