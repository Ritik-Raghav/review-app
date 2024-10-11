
window.addEventListener('DOMContentLoaded', loadData);

const form = document.querySelector('#create');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = event.target.blogTitle.value;
    const author = event.target.blogAuthor.value;
    const content = event.target.blogContent.value;

    const obj = {
        title,
        author,
        content
    }
    
    try {
        const response = await axios.post('http://localhost:3000/', obj);
        const data = response.data;
        displayItems(data);
    }
    catch(error) {
        console.log(error)
    }

    event.target.reset();
})


 function displayItems(data) {
    console.log(data)
    const head = document.createElement('div');
    head.className = 'card';
    const body = document.createElement('div');
    body.className = 'card';

    const blogName = document.createElement('h4');
    blogName.textContent = data.title;

    const blogAuthor = document.createElement('h5');
    blogAuthor.textContent = 'Author : ' + data.author;

    const blogContent = document.createElement('p');
    blogContent.textContent = data.content;

    const commentForm = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'comment';
    input.textContent = 'Comments';
    input.type = 'text';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Submit';

    commentForm.appendChild(input);
    commentForm.appendChild(button);

    head.appendChild(blogName);
    body.appendChild(blogAuthor);
    body.appendChild(blogContent);
    body.appendChild(commentForm);

    const element = document.querySelector('#element');
    element.appendChild(head);
    element.appendChild(body);

    function displayComments(data) {
        const div = document.createElement('div');
        const comment = document.createElement('p');
        comment.textContent = data.comment;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'delete';
        div.appendChild(comment);
        div.appendChild(delBtn);

        delBtn.onclick = (event) => {
            body.removeChild(event.target.parentElement);
        }

        body.appendChild(div);
    }

    commentForm.onsubmit = async (event) => {
        event.preventDefault();
        loadComments();
        const comment = event.target.comment.value;
        const obj = {
            comment
        }
        console.log(comment);
        try {
            const response = await axios.post(`http://localhost:3000/comment/${data.id}`, obj);
            const commentData = response.data;
            displayComments(commentData);

            //const getResponse = await axios.get(`http://localhost:3000/comment/${data.id}`);
            //const comments = getResponse.data;
            
            
        }
        catch(error) {
            console.log(error);
        }
    }

    async function loadComments() {
        try {
            const response = await axios.get(`http://localhost:3000/comment/${data.id}`);
            const data = response.data;
            data.forEach(element => {
                displayItems(element);
            })
        }
        catch(error) {
            console.log(error);
        }
    }
}



async function loadData() {
    try {
        const response = await axios.get('http://localhost:3000/');
        const data = response.data;
        data.forEach(element => {
            displayItems(element);
        })
    }
    catch(error) {
        console.log(error);
    }
}