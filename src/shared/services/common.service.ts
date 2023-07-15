import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  public static decodeUrl(val: string) {
    if (!val) return;

    return decodeURIComponent(val).trim();
  }
}
