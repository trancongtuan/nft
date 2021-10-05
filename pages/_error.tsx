import Layout from '../containers/Layout'

function Error({ statusCode, message }) {
  return (
    <Layout>
      <div style={{ minHeight: 800, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        <h3>{message}</h3>
      </div>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error