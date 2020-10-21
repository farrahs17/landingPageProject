
// Creating the nav dynamically
createNav = () => {
    // Getting all the sections
    const sections = document.querySelectorAll('section'); 
    // Getting the ul that will have the dynamically added li 
    const list = document.querySelector('ul');
    // Creating the document fragment that will have all the li
    const elements= document.createDocumentFragment(); 

    // Looping over the sections
    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        // Getting the anchor text from the sections data-nav attribute
        a.innerText = section.getAttribute('data-nav');
        li.appendChild(a);
        // Giving each anchor an ID attribute to be used for the activeState function
        a.setAttribute('id', section.getAttribute('id')+'a')
        // Adding the event listener to scroll to the appropriate section
        a.addEventListener('click', (e) => {
            section.scrollIntoView({behavior:'smooth'});
        });

        elements.appendChild(li);
    });

    list.appendChild(elements);
}

// Using IntersectionObserver to highlight the appropriate section while scrolling
activeState = () => {
    let observerEnter = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Getting the appropriate anchor using the ID attached earlier
            const a = document.querySelector('#' + entry.target.getAttribute('id')+"a");
            if (entry.isIntersecting) {
                // Adding the active class if it's intersecting the threshold
                entry.target.classList.add('active-section');
                a.classList.add('active-a');
            } else {
                // Removing active class when not in threshold
                entry.target.classList.remove('active-section');
                a.classList.remove('active-a');
            }
        });
    }, {threshold: [0.4], rootMargin: '0px 0px 0px 0px' });

    document.querySelectorAll('section').forEach(section => { observerEnter.observe(section) });
}
// Calling functions
createNav();
activeState();