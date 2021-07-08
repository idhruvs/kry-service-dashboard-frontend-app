import dotenv from 'dotenv';
import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import * as path from 'path'

dotenv.config()
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh()],
//   resolve: {
//     alias: {
//       '@/': path.resolve(__dirname, './src'),
//     }
//   },
// })

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [reactRefresh()],
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, './src'),
      }
    },
    define: {
      "process.env.VITE_BASE_URL": `"${process.env.VITE_BASE_URL}"`,
      "process.env.NODE_ENV": `"${mode}"`
    },
  });
}
