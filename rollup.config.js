import typescript from "@rollup/plugin-typescript"
import * as fs from "fs"
import path from "path"

const dir = "src/ts"

function isDev() {
    return !!process.argv.find(el => el === "--config-dev")
}

let files = fs.readdirSync(dir).filter(el => path.extname(el) === ".ts").map(el => dir + "/" + el)

if(!files.length) {
    throw new Error(`No sources found in: ${dir}`)
}

export default files.map(el => {
    return {
        input: el,
        output: {
            dir: "public/js",
            format: "esm",
            sourcemap: isDev()
        },
        plugins: [
            typescript({
                tsconfig: "./tsconfig.json"
            })
        ]
    }
})
