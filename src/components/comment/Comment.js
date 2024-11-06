import {React, useState, useRef} from 'react'
import './Comment.css'
import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { config } from './textEditorConfig';
import 'ckeditor5/ckeditor5.css';

function Comment(props){
    const [editorContent, setEditorContent] = useState('');
    
    //Enviar la información del texto al componente Post
    const clickSubmit = () => {

        if (editorContent.length > 0){
            console.log("Desde el editor: "+editorContent)
            props.sendContent(props.parentId, editorContent)
            
            //setEditorContent('');
        }
    }

    return(
        <div>
            <p>Comment as User</p>
            <div className='editor'>
                <CKEditor
                    editor={ClassicEditor}
                    config={config}
                    data={editorContent}
                    onChange={(event, editor) => {
                        setEditorContent(editor.getData());  // Actualiza el estado con el contenido del editor
                    }}
                />
            </div>
           
            <div id='buttonSection'>
                <button className="button">Cancel</button>
                <button className="button" onClick={clickSubmit}>Publish</button>
            </div>
            
            
            
        </div>
    )
}

export default Comment;