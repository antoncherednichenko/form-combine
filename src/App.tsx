import { FormCombine } from 'lib'
import testForm from './lib/FormCombine/data.json'
import './index.css'

function App() {
  return (
    <div className="App">
      <FormCombine
        onSubmit={(values) => {
          console.log(values, 'submit')
        }}
        data={testForm}
        scrollToError
      >
        {({ getValues }) => (
          <div>
            <button type="submit">Submit</button>
            <button
              onClick={() => {
                console.log(getValues())
              }}
              type="button"
            >
              CheckValues
            </button>
          </div>
        )}
      </FormCombine>
    </div>
  )
}

export default App
