import { cookies } from "next/headers";

class CookieService {
  getCookieStore() {
    return cookies();
  }
   async get(key: string): Promise<{domain: string}> {
      const store = await this.getCookieStore();
      const data = store.get(key);
      if (data?.value) {
        return JSON.parse(data.value);
      }
      return {domain: 'no domain in cookie'};
  }

}

const cookieService = new CookieService();
export default cookieService;
