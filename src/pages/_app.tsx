import '../styles/global.scss';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'


function MyApp({ Component, pageProps }) {
  return (
  <div>
    <main>
      <ReactNotification /> 
      <Component {...pageProps} />
    </main>
  </div>
  )
}

export default MyApp
