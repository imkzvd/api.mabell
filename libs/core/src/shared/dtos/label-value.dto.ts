export class LabelValueDTO<V = string | number> {
  constructor(
    public readonly label: string,
    public readonly value: V,
  ) {}
}
