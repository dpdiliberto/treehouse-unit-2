/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Declares how many items will be shown on the page
const itemsPerPage = 9;

/***
 * `showPage` function takes in an array containing student objects and takes in the desired page,
 * builds the list elements html, and adds them to the list
 * @param {array}    list  An array of student objects
 * @param {number}   page  A number representing the desired page
***/
function showPage(list, page) {
   // Determine the index that the displayed students should start and end on
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   // Select the .student-list class and initialize its content
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   // Loop through the list array to add build a list item for each of the students
   // between the startIndex and endIndex, and add the html to studentList
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let html = '';
         let student = list[i];
         html += `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
           <h3>${student.name.first} ${student.name.last}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${student.registered.date}</span>
         </div>
       </li>`;
       studentList.insertAdjacentHTML('beforeend', html);
      };
   };
};

/***
 * `addPagination` function takes in an array containing student objects and creates the corresponding 
 * count of pagination buttons
 * @param {array}    list  An array of student objects
***/
function addPagination(list) {
   
   // Determine how many students are in the list, and how many pages there should be
   let studentCount = list.length;
   let paginationButtonCount = Math.ceil(studentCount / 9);

   // Select .link-list class and initialize content to empty string
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   let html = '';

   // Loop through paginationButtonCount to add the appropriate number of pagination buttons to linkList
   for (let i = 0; i < paginationButtonCount; i++) {
      html += `<li>
      <button type="button">${i+1}</button>
    </li>`;
   };
   linkList.insertAdjacentHTML('beforeend', html);
   
   // Select the first button element and set the class to 'active' if buttons were created
   if (linkList.firstElementChild) {   
      let activeButton = linkList.firstElementChild.firstElementChild;
      activeButton.className = 'active';

      // Add an event listener to linkList to do the following to make the clicked button active,
      // and display corresponding students based on the page clicked
      linkList.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON') {
            let clickedButton = e.target;
            activeButton.className = '';
            clickedButton.className = 'active';
            activeButton = clickedButton;
            showPage(list, activeButton.textContent);
         };
      });
   };
};

/***
 * `addSearch` function takes in an array containing student objects and adds search functionality
 * @param {array}    list  An array of student objects
***/
function addSearch(list) {

   // Add html for a "search" label and add it to .header
   const header = document.querySelector('.header');
   const html = `<label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`;
   header.insertAdjacentHTML('beforeend', html);
   
   // Create a span element and append it to searchLabel in the event that there are no search results
   let span = document.createElement('span');
   const searchLabel = document.querySelector('.student-search');
   searchLabel.appendChild(span);
   span.textContent = '';

   // Select the search input element
   let searchInput = document.querySelector('#search');
   
   // Add event listener on keyup
   searchInput.addEventListener('keyup', (e) => {
         
      // Return to default states
      searchInput.placeholder = 'Search by name...';
      span.textContent = '';

      let searchValue = searchInput.value;
      let searchResults = [];

      // If searchResults is empty (if backspace to clear search input) then paginate with full list
      if (searchValue.length === 0) {
         showPage(list, 1);
         addPagination(list);
      } else {

         // Build array array based on search input by looping through list array and comparing each student's
         // first and last name with searchValue
         for (let i = 0; i < list.length; i++) {
            let student = list[i];
            let fullName = `${student.name.first} ${student.name.last}`;
            if (fullName.toLowerCase().includes(searchValue.toLowerCase())) {
               searchResults.push(student);
            };
         };

         // If no results are found, then display message
         if (searchResults.length === 0) {
            span.textContent = 'No matches found';
            showPage([], 1);
            addPagination([]);
         };

         // Call functions based on searchResults
         showPage(searchResults, 1);
         addPagination(searchResults);
      };
   });

   // Add event listener to change search input message if the button is clicked with no input
   header.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON') {
         let searchValue = searchInput.value;
         if (searchValue.length === 0){
            searchInput.placeholder = 'Please enter valid name';
         }
      };
   });
};

// Call showPage() function with our initial data array and initialize on page 1
showPage(data, 1);

// Call addPagination() function with our initial data array
addPagination(data);

// Call addSearch() function with our initial data array
addSearch(data);