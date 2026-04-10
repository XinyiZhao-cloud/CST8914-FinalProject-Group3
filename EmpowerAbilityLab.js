//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
function knowledgeRunner(){

}





knowledgeRunner()

// nav bar elements
const toggle = document.querySelector('button.navbar-toggler');
const navList = document.getElementById('navbarsExampleDefault');

// for expanding and collapse the nav bar on small screens
document.addEventListener('DOMContentLoaded', function () {
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      const isExpanded = navList.classList.contains('show');
      if (isExpanded) {
        navList.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        navList.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  }
});

// for closing the nav bar on touching list items (small screen)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// for closing the nav bar on touching outside nav bar (small screen)
document.addEventListener('click', function (e) {
  if (!navList.contains(e.target) && !toggle.contains(e.target)) {
    navList.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

