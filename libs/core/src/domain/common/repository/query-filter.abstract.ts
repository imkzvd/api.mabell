export abstract class QueryFilter {
  toQuery(): Record<string, any> {
    return Object.fromEntries(Object.entries(this).filter(([, v]) => v !== undefined));
  }
}
