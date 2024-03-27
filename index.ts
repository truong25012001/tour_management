import express , {Express} from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";
import Tour from "./models/tour.model";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";
dotenv.config();

sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

// App locals variable
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// TinyMCE
app.use(
	"/tinymce",
	express.static(path.join(__dirname, "node_modules", "tinymce"))
  );
  // End TinyMCE

clientRoutes(app);
adminRoutes(app);


app.listen(port, () => {
	console.log(`App listen on port ${port}`);
})