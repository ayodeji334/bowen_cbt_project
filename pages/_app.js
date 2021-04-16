import '../styles/globals.css'
import '../styles/style.css'
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "https://bowen-cbt-project.vercel.app/" : process.env.NEXTAUTH_URL;
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
