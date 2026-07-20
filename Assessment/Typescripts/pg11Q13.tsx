interface BaseEntity {
  id: string;
  createdAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
}

interface Product extends BaseEntity {
  title: string;
  price: number;
}

interface Order extends BaseEntity {
  userId: string;
  productId: string;
  quantity: number;
}

class Repository<T extends BaseEntity> {
  private store: Map<string, T> = new Map();

  create(entity: T): T {
    this.store.set(entity.id, entity);
    return entity;
  }

  read(id: string): T | undefined {
    return this.store.get(id);
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const entity = this.store.get(id);

    if (!entity) {
      return undefined;
    }

    const updatedEntity = {
      ...entity,
      ...updates,
    } as T;

    this.store.set(id, updatedEntity);
    return updatedEntity;
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }

  getAll(): T[] {
    return Array.from(this.store.values());
  }
}

type EntityRelation<
  T extends BaseEntity,
  U extends BaseEntity
> = {
  parent: T;
  child: U;
};

class RelatedEntityManager<
  T extends BaseEntity,
  U extends BaseEntity
> {
  private relations: EntityRelation<T, U>[] = [];

  constructor(
    private parentRepo: Repository<T>,
    private childRepo: Repository<U>,
    private relationKey: keyof U
  ) {}

  linkEntities(parent: T, child: U): void {
    this.relations.push({
      parent,
      child,
    });
  }

  getRelatedEntities(parentId: string): U[] {
    return this.relations
      .filter((relation) => relation.parent.id === parentId)
      .map((relation) => relation.child);
  }
}