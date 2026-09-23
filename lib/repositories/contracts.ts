export type EntityId = string;
export interface ReadRepository<T> {
  findById(id: EntityId): Promise<T | null>;
}
export interface WriteRepository<T, CreateInput> {
  create(input: CreateInput): Promise<T>;
}
