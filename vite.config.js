import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig(({mode})=>({base:'./',plugins:[react()],define:{__SKIN__:JSON.stringify(['android','ios','desktop'].includes(mode)?mode:'ios')},build:{outDir:mode==='desktop'?'dist-desktop':'dist'}}))
