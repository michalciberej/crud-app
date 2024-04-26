import List from './components/List';
import Form from './components/Form';

function App() {
  return (
    <div className='App'>
      <main className='w-full lg:w-1/2 m-auto flex flex-col lg:flex-row gap-5 p-2'>
        <List />
        <Form />
      </main>
    </div>
  );
}

export default App;
