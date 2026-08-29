const currentYearSpan = document.querySelector('#currentyear');
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedParagraph = document.querySelector('#lastModified');
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;