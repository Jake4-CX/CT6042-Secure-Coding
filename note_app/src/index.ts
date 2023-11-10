import App from "./main";
import { Database } from "./utils/db.server";

(
  async () => {

    const app = new App();

    const db = Database.getInstance();
    await db.initializeDatabase();

    app.start();

    app.app.listen(process.env.NOTES_API_PORT ?? 3000, () => {
      console.log("Example app listening on port 3000!");
    });

  }
)();