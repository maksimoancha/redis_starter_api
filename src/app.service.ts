import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache) {}

  async getHello() {
    const setKey = 'dates';
    const existValues = await this._cacheManager.get<string>(setKey);

    const setValue = existValues
      ? existValues + '_' + Date.now()
      : String(Date.now());

    await this._cacheManager.set(setKey, setValue);

    const res = await this._cacheManager.get<string>(setKey);

    console.log(res);
    return res;
  }
}
