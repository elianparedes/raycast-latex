import { Action, ActionPanel, Grid } from "@raycast/api";
import { useEffect, useState } from "react";
import { renderSymbolToBase64 } from "../lib";
import { Symbol } from "../types";

interface SymboLItemProps {
  symbol: Symbol;
}

export function SymbolItem({ symbol: { name, syntax, keywords = [] } }: SymboLItemProps) {
  const [base64, setBase64] = useState<string>("");

  useEffect(() => {
    const loadSymbol = async () => {
      try {
        const base64 = await renderSymbolToBase64(syntax);
        setBase64(base64);
      } catch (error) {
        console.error(`Error rendering symbol ${name}:`, error);
      }
    };

    loadSymbol();
  }, []);

  return (
    <Grid.Item
      key={name}
      content={{ value: { source: base64 }, tooltip: syntax }}
      title={name}
      keywords={[name, syntax, ...keywords]}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard content={syntax} />
        </ActionPanel>
      }
    />
  );
}
