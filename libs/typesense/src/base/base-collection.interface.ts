export interface BaseCollection<Payload, IndexedDTO> {
  save(payload: Payload): Promise<void>;

  search(q: string): Promise<IndexedDTO[]>;

  delete(id: string): Promise<void>;
}
