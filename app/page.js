"use client"
import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const files = {
  "script.js": {
    name: "filename",
    language: 'javascript',
    value: "//a",
  },
}

export default function Home() {

  const [filename, setFileName] = useState("script.js")
  const [copyText, setCopyText] = useState(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("copyText")) : "" || "")
  const file = files[filename]
  const [readOnly, setReadOnly] = useState(false)


  {/* it will take up the full width / height of its container (width: 100%, height: 100%)
    editors of any size
    full screen, embed type size


    1. Be able to change from 1 file to the next
    2. Get the value of the Monaco editor 
  */}

  function handleEditorChange(value, event) {
    setCopyText(value)
  }


  // this is copy function
  // copy the text from the editor

  const copyToClipboard = () => {
    if (copyText === "") {
      toast.warning("No code is here")
    }
    else {
      navigator.clipboard.writeText(copyText)
      toast.success("coppied", { position: toast.POSITION.BOTTOM_RIGHT })
    }
  }

  // this save function 
  // save the text in localstorage and then show the data on the text editor

  const handleSave = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      let coppiedText = JSON.parse(localStorage.getItem("copyText"))
      localStorage.setItem("copyText", JSON.stringify(copyText))
      setCopyText(coppiedText)
    }
    toast.success("Saved", { position: toast.POSITION.BOTTOM_RIGHT })
  }

  const handleReadOnly = () => {
    setReadOnly(!readOnly)    
  }

  return (
    <>
      <main className="container m-auto">
        <Header />

        <Editor
          height="87vh"
          width="100%"
          theme='vs-dark'
          onChange={handleEditorChange}
          defaultValue={copyText}
          defaultLanguage={file.language}
          path={file.name}
          options={{
            fontSize: "20px",
            readOnly: String(readOnly)
          }}
        />

        <div className='mt-1 flex flex-wrap'>
          <button onClick={copyToClipboard} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Copy the Code</button>
          <button type="button" onClick={handleSave} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save the Code</button>
          <button type="button" onClick={handleReadOnly} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Lock/Unlock</button>
        </div>

      </main>
      <ToastContainer />
    </>
  )
}
