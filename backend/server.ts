import app from "./app.ts"
import "dotenv/config"

const PORT = process.env.PORT_DEV || 4001

app.listen(PORT, () => {
    console.log("Server running: ", PORT)
    console.log()
})