import express from "express" // 3RD PARTY MODULE (does need to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path" // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid" // 3RD PARTY MODULE (does need to be installed)

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const authorsJSONPath = join(parentFolderPath, "author.json")

authorsRouter.get("/", (req, res) => {
    const fileContent = fs.readFileSync(authorsJSONPath)
    console.log(req.body)
})

authorsRouter.get("/", (req, res) => {
    console.log(req.body)
})

export default authorsRouter