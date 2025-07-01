export interface BaseCollection<IndexedDTO, AppDTO> {
  save(dto: AppDTO): Promise<void>;

  searchByQuery(q: string): Promise<IndexedDTO[]>;

  deleteById(id: string): Promise<void>;
}
