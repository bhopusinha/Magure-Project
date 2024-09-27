import app from "./app";
import env from "./config/environment.config";

const PORT = env.app.port || 4000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

