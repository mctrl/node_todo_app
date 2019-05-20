
export default class ApiWrapper {
    //private host: string = "http://server:3000"
    private host: string = "http://192.168.99.100:3000";

    protected get(url) {
        return window.fetch(`${this.host}/${url}`, {
            method: "GET",
        });
    }

    protected update(url, body) {
        return window.fetch(`${this.host}/${url}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }

    protected delete(url) {
        return window.fetch(`${this.host}/${url}`, {
            method: "DELETE",
          })
    }

    protected post(url, body) {
        return window.fetch(`${this.host}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body)
          })
    }

}