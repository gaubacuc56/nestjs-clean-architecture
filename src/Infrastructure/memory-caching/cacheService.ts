// import { CACHE_MANAGER } from "@nestjs/cache-manager";
// import { Inject, Injectable } from "@nestjs/common";

// import { Cache } from "cache-manager";

// @Injectable()
// export class CacheService {
//     constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }
//     async set(key: string, value: string): Promise<void> {
//         await this.cacheManager.set(key, value)
//     }

//     async get(key: string): Promise<void> {
//         await this.cacheManager.get(key)
//     }

//     async delete(key: string): Promise<void> {
//         await this.cacheManager.del(key)
//     }
// }