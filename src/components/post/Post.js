import {React, useState} from 'react'
import Comment from '../comment/Comment';
function Post(){
    let idSeq = 0
    const [commenting, setCommenting] = useState(false);
    const [repling, setRepling] = useState(false);
    const [comments, setComments] = useState([]);  // Almacena los comentarios publicados
    const [replyTo, setReplyTo] = useState(null);

    const handleCommenting = () =>{
        setCommenting(!commenting)
    }

    const getCommentContent = (parentId, editorContent) => {
        if (parentId === null){
            console.log("Actual content comment:"+editorContent);
            //setActualEditorContent(editorContent);
            handleNewComment(editorContent);
            setCommenting(!commenting)
        }
        else {
            console.log("Actual content reply:"+editorContent);
            //setActualEditorContent(editorContent);
            handleNewReply(parentId, editorContent);
            setRepling(!commenting)
        }
        
        
    }

    const handleNewComment = (actualEditorContent) =>{
        idSeq++;
        setComments([...comments, {id: idSeq, content: actualEditorContent, replies: []}]);
        //setActualEditorContent('');
    }

    const addReply = (comments, parentId, reply) =>{
        
        return comments.map( comment=>{
            if (comment.id === parentId){
                const comentario = {...comment, replies: [...comment.replies, reply]};
                console.log("Respuesta: " + comentario)
                return comentario;
            }
            else if (comment.replies.length > 0){
                return {...comment, replies: addReply(comment.replies, parentId, reply)};
            }

            return comment
        });
    };

    const handleNewReply = (parentId, actualEditorContent) =>{
        idSeq++;
        const updatedComments = addReply(comments, parentId, {id: idSeq, content: actualEditorContent, replies: []});
        console.log("Updated comments: " + updatedComments)
        setComments(updatedComments);
        //setActualEditorContent('');

    }

    const renderComments = (comments) => {
        console.log(comments)
        return comments.map((comment) => (
            <div key={comment.id}>
                <div dangerouslySetInnerHTML={{__html: comment.content}}/>
                <button onClick={() => setReplyTo(comment.id)}>Reply</button>

                {repling === true && comment.id === replyTo && (<Comment sendContent = {getCommentContent} parentId = {comment.id}/>)}

                <div>
                    {comment.replies.length > 0 && (renderComments(comment.replies))}
                </div>
            </div>

        ));
    };

    return (
        <div>
            <h2>What AI won't replace in your programming</h2>
            <button className="commentButton" onClick={handleCommenting}>Comment</button>
            <p># of comments {comments.length}</p>
            {commenting === true && (<Comment sendContent = {getCommentContent} parentId = {null}/>)}
            <h3>Comments</h3>
            <div>
                {renderComments(comments)}
            </div>
        </div>
    );
}

export default Post;