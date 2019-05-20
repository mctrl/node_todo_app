
export default class ApiWrapper {
    //private host: string = "http://server:3000"
    private host: string = "http://192.168.99.100:3000";

    protected get(url) {
        return this.fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
        })
    }

    protected update(url, body) {
        return this.fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }

    protected delete(url) {
        return this.fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          })
    }

    protected post(url, body) {
        return this.fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body)
          })
    }
    private fetch(url, config) {
        return window.fetch(`${this.host}/${url}`, config)
          .then(response => response.json())
          .catch((error) => {
            return error;
        })
    }

}