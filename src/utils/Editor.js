import React from 'react';  
import JoditEditor from 'jodit-react';  

const Editor = ({ content, handleChange }) => {  
    return (  
        <JoditEditor  
            value={content} // Pass the current content value here  
            tabIndex={1} // tabIndex of textarea  
            onBlur={(newContent) => handleChange({ target: { name: 'content', value: newContent }})} // Send the new content back  
            onChange={(newContent) => handleChange({ target: { name: 'content', value: newContent }})} // Update the content directly  
        />  
    );  
};  

export default Editor;