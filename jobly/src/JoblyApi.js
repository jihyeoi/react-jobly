// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }


  /** Get list of companies */

  static async getCompanies(name = "") {
    const data = name ? { nameLike: name } : "";
    let res = await this.request("companies", data);
    return res.companies;
  }

  /** Get a company by handle */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs */

  static async getJobs(job = "") {
    const data = job ? { title: job } : "";
    const res = await this.request("jobs", data);
    return res.jobs;
  }

  /** return token when user registers */

  static async register({ username, password, firstName, lastName, email }) {
    const res = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email },
      "POST"
    );

    return res.token;
  }

  /** return token when user logs in */

  static async login({ username, password }) {
    const res = await this.request(
      "auth/token",
      { username, password },
      "POST"
    );

    return res.token;
  }

  /** get user info by username */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** patch user by either firstName, lastName, email */

  static async updateUser({username, firstName, lastName, email}) {
    let res = await this.request(
      `users/${username}`,
      { firstName, lastName, email },
      "PATCH"
    )
    return res.user;
  }

  /** lets user apply to companies */

  static async apply({username, jobId}) {
    let res = await this.request(
      `users/${username}/jobs/${jobId}`,
      { username, jobId },
      "POST"
    )
    console.log("res", res)
    return res
  }


}

export default JoblyApi;