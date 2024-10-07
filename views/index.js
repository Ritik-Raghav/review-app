
const form = document.querySelector('#create');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const companyName = event.target.companyName.value;
    const pros = event.target.pros.value;
    const cons = event.target.cons.value;
    
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    let ratingValue = document.getElementById('rating-value');

        // Add an event listener for each input
        ratingInputs.forEach(input => {
            
            input.addEventListener('change', (e) => {
                ratingValue.value = e.target.value;
            });
            
        });

        const rating  = document.getElementById('rating-value').value;

        
        let obj = {
            companyName,
            pros,
            cons,
            rating
        }
        console.log(obj)

    try {
        const response = await axios.post('http://localhost:3000/', obj);
        const data = response.data;
        displayPost(data);
    }
    catch(error) {
        console.log(error);
    }
    
    event.target.reset();
});

const search = document.querySelector('#search');

search.addEventListener('submit', async (event) => {
    event.preventDefault()
    const name = event.target.searchCompany.value;

    try {
        const response = await axios.get('http://localhost:3000/');
        const data = response.data;
        //displayRating(data);
        data.forEach(review => {
            if (name === review.companyName) {
                displayPost(review, data);
                displayElement(data, name);
            }
        })

    }
    catch(error) {
        console.log(error);
    }
})

function displayPost(obj, arr) {

    const rate = displayRating(arr);
    console.log(rate)
    
    const div = document.createElement('div');
    div.className = 'card card-title text-center';
    div.id = 'hi';
    const heading1 = document.createElement('h5');
    heading1.textContent = 'Company Name : ' + obj.companyName;

    const heading2 = document.createElement('h5');
    heading2.textContent = 'Company Rating : ' + rate;



    // const pros = document.createElement('p');
    // pros.textContent = 'Pros : ' + obj.pros;

    // const cons = document.createElement('p');
    // cons.textContent = 'Cons : ' + obj.cons;

    // let rating = document.createElement('p');
    // rating.textContent = 'Rating : ' + obj.rating;

    div.appendChild(heading1);
    div.appendChild(heading2);

    const post = document.querySelector('#post');
    post.appendChild(div);

    
}

function displayElement(obj, name) {
    
    // const div = document.createElement('div');
    // div.className = 'card card-title text-center';
    // const heading1 = document.createElement('h5');
    // heading1.textContent = 'Company Name : ' + obj.companyName;

    // const heading2 = document.createElement('h5');
    // heading2.textContent = 'Company Rating : ' + obj.rating;

    const div = document.createElement('div');
    

    obj.forEach(data => {
        if (name === data.companyName) {
        
            const pros = document.createElement('p');
            pros.textContent = 'Pros : ' + data.pros;
    
            const cons = document.createElement('p');
            cons.textContent = 'Cons : ' + data.cons;
    
            let rating = document.createElement('p');
            rating.textContent = 'Rating : ' + data.rating;
    
            const hr = document.createElement('hr');
    
    
            div.appendChild(pros);
            div.appendChild(cons);
            div.appendChild(rating);
            div.appendChild(hr);
    
            const hi = document.querySelector('#hi');
            hi.appendChild(div);
        }
    })
    
}

function displayRating(obj) {
    let rating = 0;
    obj.forEach(object => {
        rating = object.rating + rating;
    })
    rating = rating/obj.length;
    return rating;
}