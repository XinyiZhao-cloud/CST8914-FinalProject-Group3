function knowledgeRunner() {}

knowledgeRunner();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("button.navbar-toggler");
  const navList = document.getElementById("navbarsExampleDefault");
  const navLinks = Array.from(document.querySelectorAll(".nav-link[data-route]"));
  const views = Array.from(document.querySelectorAll(".spa-view"));
  // Route map ties each hash to its view, focus target, and unique page title.
  const routes = {
    home: {
      title: "Home - Empower Ability Labs",
      view: document.getElementById("home"),
      focusTarget: document.getElementById("homeHeading")
    },
    services: {
      title: "Services - Empower Ability Labs",
      view: document.getElementById("services"),
      focusTarget: document.getElementById("servicesHeading")
    },
    schedule: {
      title: "Schedule a Call - Empower Ability Labs",
      view: document.getElementById("schedule"),
      focusTarget: document.getElementById("scheduleHeading")
    }
  };

  // Read the current hash so Home, Services, and Schedule work like SPA pages.
  function getRouteFromHash() {
    const routeName = window.location.hash.replace("#", "").trim().toLowerCase();
    return routes[routeName] ? routeName : "home";
  }

  // Update aria-current so assistive tech knows which nav item is active.
  function setActiveNav(routeName) {
    navLinks.forEach((link) => {
      const isActive = link.dataset.route === routeName;
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Show only the selected SPA view and hide the others.
  function setActiveView(routeName) {
    views.forEach((view) => {
      const isActive = view.dataset.view === routeName;
      view.hidden = !isActive;
      view.setAttribute("aria-hidden", String(!isActive));
    });
  }

  // Move focus to the current view heading after navigation changes.
  function focusRouteHeading(routeName) {
    const route = routes[routeName];
    if (route && route.focusTarget) {
      route.focusTarget.focus();
    }
  }

  function closeMobileNav() {
    if (toggle && navList) {
      navList.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  // Render the current route by syncing the visible view, nav state, and title.
  function renderRoute(options = {}) {
    const { shouldFocus = false } = options;
    const routeName = getRouteFromHash();
    const route = routes[routeName];

    setActiveView(routeName);
    setActiveNav(routeName);
    document.title = route.title;

    if (shouldFocus) {
      focusRouteHeading(routeName);
    }
  }

  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const isExpanded = navList.classList.contains("show");
      navList.classList.toggle("show", !isExpanded);
      toggle.setAttribute("aria-expanded", String(!isExpanded));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Collapse the mobile menu after choosing a new SPA view.
      closeMobileNav();
    });
  });

  document.addEventListener("click", (event) => {
    if (!navList || !toggle) {
      return;
    }

    const clickedInsideNav = navList.contains(event.target);
    const clickedToggle = toggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMobileNav();
    }
  });

  // Keep Back and Forward buttons synced with the correct SPA state.
  window.addEventListener("hashchange", () => {
    renderRoute({ shouldFocus: true });
  });

  // Default to Home if there is no valid hash route yet.
  if (!window.location.hash || !routes[window.location.hash.replace("#", "").toLowerCase()]) {
    window.location.hash = "#home";
  } else {
    renderRoute();
  }
});
