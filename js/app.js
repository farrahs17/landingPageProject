

createNav = () => {
    const sections = document.querySelectorAll('section');  
    const list = document.querySelector('ul');
    const elements= document.createDocumentFragment(); 

    for (let i = 0; i < sections.length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.innerText = sections[i].getAttribute('data-nav');
        li.appendChild(a);
        a.setAttribute('id',sections[i].getAttribute('id')+'a')

        a.addEventListener('click', (e) => {
            sections[i].scrollIntoView({behavior:'smooth'});
        });

        elements.appendChild(li);
    }

    list.appendChild(elements);

}

activeState = () => {

    let observerEnter = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const a = document.querySelector('#' + entry.target.getAttribute('id')+"a");
            if (entry.isIntersecting) {
                entry.target.classList.add('active-section');
                a.classList.add('active-a');
            } else {
                entry.target.classList.remove('active-section');
                a.classList.remove('active-a');
            }
        });
    }, {threshold: [0.4], rootMargin: '0px 0px 0px 0px' });

    document.querySelectorAll('section').forEach(section => { observerEnter.observe(section) });
}

createNav();
activeState();