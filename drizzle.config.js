import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    dialect:"postgresql",
    schema:"./config/schema.jsx",
    dbCredentials:{
        url:'postgresql://threadcraftai_owner:rQl8MzPiuys2@ep-little-bar-a8edssk4.eastus2.azure.neon.tech/ai-kids-study-material?sslmode=require'
    },
    verbose: true,
    strict: true
})