import './App.css';
import Homepage from './components/Homepage.js'

function Layout(props) {
  return (
  <>
    {props.children}
  </>
  )
}

function App() {
  return (
    <div className="App">
      <Layout>
        <Homepage />
      </Layout>
    </div>
  );
}

export default App;
