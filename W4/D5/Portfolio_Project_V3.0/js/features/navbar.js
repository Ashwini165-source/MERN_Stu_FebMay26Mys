
(() => {
	const navToggle = document.getElementById('nav-toggle');
	const mobileMenu = document.getElementById('mobile-menu');
	const openIcon = document.getElementById('nav-icon-open');
	const closeIcon = document.getElementById('nav-icon-close');
	const themeToggle = document.getElementById('theme-toggle');
	const themeToggleMobile = document.getElementById('theme-toggle-mobile');
	const modalTrigger = document.getElementById('modal-trigger');
	const modalTriggerMobile = document.getElementById('modal-trigger-mobile');

	function setAriaExpanded(isOpen) {
		if (navToggle) {
			navToggle.setAttribute('aria-expanded', String(isOpen));
			navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
		}
	}

	function swapIcons(isOpen) {
		if (!openIcon || !closeIcon) return;
		if (isOpen) {
			openIcon.classList.add('hidden');
			closeIcon.classList.remove('hidden');
		} else {
			openIcon.classList.remove('hidden');
			closeIcon.classList.add('hidden');
		}
	}

	function closeMenu() {
		if (!mobileMenu) return;
		mobileMenu.classList.remove('open');
		swapIcons(false);
		setAriaExpanded(false);
		document.body.classList.remove('overflow-hidden');
	}

	function openMenu() {
		if (!mobileMenu) return;
		mobileMenu.classList.add('open');
		swapIcons(true);
		setAriaExpanded(true);
		document.body.classList.add('overflow-hidden');
	}

	function toggleMenu() {
		if (!mobileMenu) return;
		const isOpen = mobileMenu.classList.contains('open');
		isOpen ? closeMenu() : openMenu();
	}

	// Close menu on resize to desktop (prevents stale open state)
	function handleResize() {
		if (window.matchMedia('(min-width: 768px)').matches) {
			closeMenu();
		}
	}

	// Wire up events
	if (navToggle) {
		navToggle.addEventListener('click', toggleMenu);
	}
	window.addEventListener('resize', handleResize);

	// Close menu when navigating (anchor clicks)
	if (mobileMenu) {
		mobileMenu.addEventListener('click', (e) => {
			const target = e.target;
			if (target && target.closest('a[href^="#"]')) {
				closeMenu();
			}
		});
	}

	// Mirror modal action between desktop and mobile where present
	if (modalTrigger && modalTriggerMobile) {
		modalTriggerMobile.addEventListener('click', () => modalTrigger.click());
	}
})();