import List from './components/List';
import Form from './components/Form';

function App() {
  return (
    <div className='App'>
      <main className='w-full mx-auto flex flex-col-reverse md:flex-row gap-5 p-2 xl:w-2/3'>
        <List />
        <Form />
      </main>
    </div>
  );
}

export default App;
