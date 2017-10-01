
import express from 'express';
import bodyParser from 'body-parser';
import controller from './controllers/controller';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', controller);

app.listen(process.env.PORT || 3000, () => {
	console.log("listening on port 3000")
});

export default app;
