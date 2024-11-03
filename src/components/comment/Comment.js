import {React, useState} from 'react'

import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { config } from './textEditorConfig';
import 'ckeditor5/ckeditor5.css';

function Comment(props){
    const [editorContent, setEditorContent] = useState('');
    

    const clickSubmit = () => {

        if (editorContent.length > 0){
            console.log("Desde el editor: "+editorContent)
            props.sendContent(props.parentId, editorContent)
            
            //setEditorContent('');
        }
    }

    return(
        <div>
            <h5>User</h5>
            <CKEditor
                editor={ClassicEditor}
                config={config}
                data={editorContent}
                onChange={(event, editor) => {
                    setEditorContent(editor.getData());  // Actualiza el estado con el contenido del editor
                }}
            />
            
            <button className="commentButton">Cancel</button>
            <button onClick={clickSubmit}>Publish</button>
            
            
        </div>
    )
}

export default Comment;