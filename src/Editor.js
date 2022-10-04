import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import { Controlled as ControlledEditor } from 'react-codemirror2'

function Editor(props) {
  const {
    language,
    value,
    onChange
  } = props

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div style={{width:"700px", border:"1px solid #3E3E3E"}}>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
        }}
      />
    </div>
  )
}

export default Editor