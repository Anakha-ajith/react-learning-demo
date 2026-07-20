interface CacheItem<T> {
    key: string;
    value: T;
    timestamp: number;
}

class TypedCache {
    private cache: Map<string, CacheItem<any>> = new Map();

    // Store any object
    set<T extends object>(key: string, value: T): void {
        this.cache.set(key, {
            key,
            value,
            timestamp: Date.now()
        });
    }

    // Retrieve an item by key
    get<T extends object>(key: string): T | undefined {
        const item = this.cache.get(key);

        if (!item) {
            return undefined;
        }

        return item.value as T;
    }

    // Retrieve all cached items matching a type
    getByType<T extends object>(type: new () => T): T[] {
        const result: T[] = [];

        for (const item of this.cache.values()) {
            if (item.value instanceof type) {
                result.push(item.value as T);
            }
        }

        return result;
    }

    clear(): void {
        this.cache.clear();
    }
}

// Example Classes
class User {
    constructor(
        public name: string,
        public age: number
    ) {}
}

class Config {
    constructor(
        public timeout: number
    ) {}
}

// Usage
const cache = new TypedCache();

cache.set("user1", new User("Alice", 30));
cache.set("user2", new User("Bob", 25));
cache.set("config", new Config(5000));

const a = cache.get<User>("user1");
console.log(a);

// const users = cache.getByType(User);
// console.log(users);

// const configs = cache.getByType(Config);
// console.log(configs);