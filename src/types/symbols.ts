export interface Symbol {
  name: string;
  syntax: string;
  keywords?: string[];
}

export interface SymbolsDictionary {
  [group: string]: {
    layout?: {
      columns?: number;
    };
    symbols: Symbol[];
  };
}
