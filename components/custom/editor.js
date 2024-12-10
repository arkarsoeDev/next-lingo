// components/custom-editor.js
'use client' // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, FontColor } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { useRef } from 'react';

function CustomEditor() {

  const editorRef = useRef();

  const onChangeHandler = (e) => {
    alert(editorRef.current.getData())
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={onChangeHandler}
      onReady={(editor) => {
        editorRef.current = editor;
      }}
      config={{
        toolbar: {
          items: ['undo', 'redo', '|', 'bold', 'italic', '|', 'fontColor'],
        },
        fontColor: {
          colors: [
            {
              color: '#ffffff',
              label: 'white'
            },
          ]
        },
        plugins: [
          Bold, Essentials, Italic, Mention, Paragraph, Undo, FontColor
        ],
        mention: {
          // Mention configuration
        },
        initialData: '<p>Hello from CKEditor 5 in React!</p>'
      }}
    />
  );
}

export default CustomEditor;
