class Fetcher {
  headers: Record<string, string>;

  constructor() {
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  _fetchData = async <T>(
    method: string,
    url: string,
    params?: object,
  ): Promise<[T | null, any]> => {
    const body = params ? JSON.stringify(params) : undefined;
    const res = await fetch(`/api${url}`, {
      method,
      body,
      headers: this.headers,
    });

    const json = await res.json();
    if (res.ok) return [json, null];
    else return [null, json];
  };

  get = <T>(url: string, params?: object) =>
    this._fetchData<T>("GET", url, params);
  post = <T>(url: string, params?: object) =>
    this._fetchData<T>("POST", url, params);
  put = <T>(url: string, params?: object) =>
    this._fetchData<T>("PUT", url, params);
  patch = <T>(url: string, params?: object) =>
    this._fetchData<T>("PATCH", url, params);
  delete = <T>(url: string, params?: object) =>
    this._fetchData<T>("DELETE", url, params);
}

export const fetcher = new Fetcher();
