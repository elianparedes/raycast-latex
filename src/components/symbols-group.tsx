import { Grid } from "@raycast/api";
import { PropsWithChildren } from "react";

interface SymbolsSectionProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  columns: number;
}

export function SymbolsSection({ title, subtitle, children, columns }: SymbolsSectionProps) {
  return (
    <Grid.Section title={title} subtitle={subtitle} columns={columns}>
      {children}
    </Grid.Section>
  );
}
