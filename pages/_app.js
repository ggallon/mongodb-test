import { Provider } from 'next-auth/client'
import '@/styles/index.css'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
