import {React, useEffect, useState} from 'react'
import Comment from '../comment/Comment';
import './Post.css'

function Post(){
    const [commenting, setCommenting] = useState(false);
    const [repling, setRepling] = useState(false);
    const [comments, setComments] = useState([]);  // Almacena los comentarios publicados
    const [replyTo, setReplyTo] = useState(null);


    const fetchComments = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/comments/list?format=json',{
                mode: 'cors',
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                });
            if (!response.ok) {
                throw new Error('Error al obtener los comentarios');
            }
            let data = await response.json();
            data = data.map(comment => ({
                ...comment,
                replies: comment.replies || []  // Si replies es undefined, asigna un array vacío
            }));
            setComments(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);


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

    const handleNewComment = async (actualEditorContent) =>{

        const parser = new DOMParser();
        const doc = parser.parseFromString(actualEditorContent, 'text/html');
        const textContent = doc.body.textContent || "";

        try {
            const response = await fetch('http://127.0.0.1:8000/api/comments/', {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({content: textContent, responseComment: null})
                
            });

            if (!response || !response.ok) {
                throw new Error('Network response was not ok');
            }

        const data = await response.json();
        setComments([...comments, data]);
        console.log('Success:', data);
        }
        catch (err){
            console.log(err)
        }
        
        //setActualEditorContent('');
    }

    const addReply = (comments, parentId, reply) =>{
        console.log('Se entró a addReply')
        
        return comments.map( async comment=>{
            if (comment.id === parentId){

                try {
                    const response = await fetch('http://127.0.0.1:8000/api/comments/'+parentId+'/reply', {
                        method: 'POST',
                        mode: 'cors',
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                        body: JSON.stringify(reply),
                        
                    })
        
                    if (!response || !response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const data = await response.json();
                    console.log(data);
                }
                catch (err){
                    console.log(err.mesage)
                }

                const comentario = {...comment, replies: [...comment.replies, reply]};
                console.log("Comentario")
                console.log(comentario)
                return comentario;
            }
            else if (comment.replies.length > 0){
                return {...comment, replies: addReply(comment.replies, parentId, reply)};
            }

            return comment
        });
    };

    const handleNewReply = (parentId, actualEditorContent) =>{
        const parser = new DOMParser();
        const doc = parser.parseFromString(actualEditorContent, 'text/html');
        const textContent = doc.body.textContent || "";

        console.log(comments)

        addReply(comments, parentId, {content: textContent, responseComment:parentId});
        setRepling(false)
        setReplyTo(null)
        fetchComments()
        //setActualEditorContent('');

    }

    const renderComments = (comments) => {
        
        return comments.map((comment) => (
            <div className='comment' key={comment.id}>
                <div className='commentTitle'>
                    <img className='userImage' src= '/userPicture.png'/>
                    <h5>User:</h5>
                </div>
                
                <div className='commentText' dangerouslySetInnerHTML={{__html: comment.content}}/>
                <button onClick={() => {setReplyTo(null); setRepling(false);}}>Cancel</button>
                <button onClick={() => {setReplyTo(comment.id); setRepling(!repling);}}>Reply</button>

                {repling === true && comment.id === replyTo && (<Comment sendContent = {getCommentContent} parentId = {comment.id}/>)}

                <div className='replies'>
                    {comment.replies.length > 0 && (renderComments(comment.replies))}
                </div>
            </div>

        ));
    };

    return (
        <div className='post'>
            <h2>What AI won't replace in your programming</h2>
            <div className='actionsSection'>
                <button id="commentButton" onClick={handleCommenting}><img className='commentImage' src="/chat-box.svg" height ="90" width="480" /></button>
                <p>{comments.length} Comments</p>
            </div>
            
            {commenting === true && (<Comment sendContent = {getCommentContent} parentId = {null}/>)}
            <h3>Comments</h3>
            <div className='replies'>
                {renderComments(comments)}
            </div>
        </div>
    );
}

export default Post;