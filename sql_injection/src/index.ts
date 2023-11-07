import App from "./main";

(
  async () => {

    const app = new App();

    app.start();

    app.app.listen(process.env.NOTES_API_PORT ?? 3000, () => {
      console.log("Example app listening on port 3000!");
    });

  }
)();