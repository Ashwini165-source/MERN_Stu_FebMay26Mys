function initNavbarScroll() {

    const navbar = document.getElementById("main-navbar");

    if (!navbar) {
        console.log("Navbar element not found");
        return;
    }

    function updateNavbar() {
        if (window.scrollY > 80) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    }

    let rafId = 0;
    let rafUntil = 0;

    function scheduleRecheck() {
        // Anchor navigation (and any smooth scrolling) updates scroll position over time.
        // Run a short rAF loop to keep navbar state in sync during the jump.
        if (rafId) cancelAnimationFrame(rafId);
        rafUntil = performance.now() + 700;

        function tick() {
            updateNavbar();
            if (performance.now() < rafUntil) {
                rafId = requestAnimationFrame(tick);
            } else {
                rafId = 0;
            }
        }

        rafId = requestAnimationFrame(tick);
    }

    // Apply immediately (e.g. refresh mid-page)
    updateNavbar();
    window.addEventListener("load", scheduleRecheck);
    window.addEventListener("pageshow", scheduleRecheck);

    window.addEventListener(
        "scroll",
        function () {
            updateNavbar();
        },
        { passive: true }
    );

    window.addEventListener("hashchange", scheduleRecheck);

    // If user clicks navbar links, ensure we re-evaluate after jump/smooth scroll.
    navbar.addEventListener("click", function (e) {
        const target = e.target;
        if (!(target instanceof Element)) return;
        const link = target.closest("a[href^='#']");
        if (!link) return;
        scheduleRecheck();
    });

    // Re-evaluate when theme changes (dark-mode class toggled on <body>).
    const observer = new MutationObserver(function (mutations) {
        for (const m of mutations) {
            if (m.type === "attributes" && m.attributeName === "class") {
                scheduleRecheck();
                break;
            }
        }
    });
    observer.observe(document.body, { attributes: true });

    console.log("Navbar scroll initialized successfully");
}
