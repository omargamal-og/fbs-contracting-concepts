import { defineConfig } from '@playwright/test'
const productionDir='artifacts/v2/production-'+Date.now()
export default defineConfig({
  metadata:{productionDir},
  testDir:'./tests/v2',fullyParallel:true,workers:2,retries:0,timeout:30000,
  reporter:'list',outputDir:'test-results/v2',
  use:{channel:'chrome',headless:true,viewport:{width:1440,height:1000},trace:'retain-on-failure'},
  projects:[
    {name:'development',testMatch:'homepage.spec.mjs',use:{baseURL:'http://127.0.0.1:5173'}},
    {name:'production',testMatch:'production.spec.mjs',use:{baseURL:'http://127.0.0.1:4173'}},
  ],
  webServer:[
    {command:'npm run dev -- --host 127.0.0.1 --port 5173 --strictPort',url:'http://127.0.0.1:5173/contracting/v2',reuseExistingServer:true,timeout:30000},
    {command:`node node_modules/vite/bin/vite.js build --outDir ${productionDir} && node node_modules/vite/bin/vite.js preview --outDir ${productionDir} --host 127.0.0.1 --port 4173 --strictPort`,url:'http://127.0.0.1:4173/contracting/v2',reuseExistingServer:false,timeout:60000,
      env:{VITE_SUPABASE_URL:'https://fbs-ui-test.invalid',VITE_SUPABASE_PUBLISHABLE_KEY:'sb_publishable_synthetic_ui_test',VITE_MAPBOX_PUBLIC_TOKEN:''}},
  ],
})

