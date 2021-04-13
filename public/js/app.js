document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.navbar-nav');
  nav.childNodes.forEach((child) => {
    const elem = child.children[0];
    if (window.location.href.includes(elem.dataset.module)) {
      elem.classList.add('active');
    }
  });
});
