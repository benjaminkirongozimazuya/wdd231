const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, certificate: 'Web and Computer Programming', completed: false }
];

const container = document.querySelector('#course-container');
const totalCreditsEl = document.querySelector('#course-total');

function displayCourses(filteredCourses) {
    container.innerHTML = '';
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

document.querySelector('#all').addEventListener('click', () => displayCourses(courses));
document.querySelector('#cse').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));
document.querySelector('#wdd').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));

displayCourses(courses);