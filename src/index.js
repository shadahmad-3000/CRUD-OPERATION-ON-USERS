const app = require("./app");
const dotenv = require("dotenv");
const { dbconnect } = require("./dbconnect");
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    try {
        console.log(`Server is running at ${port}`);
        await dbconnect();
    } catch (error) {
        console.error(error?.message || error?.data || error,"Server Not running")
    }
});


