document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ĐIỀU HƯỚNG SPA (SINGLE PAGE APPLICATION) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const logo = document.querySelector('.logo');

    // Hàm chuyển đổi Section
    function switchSection(targetId) {
        // Xóa trạng thái active của toàn bộ section và nav item
        sections.forEach(sec => sec.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Thêm trạng thái active cho section và nav item được chọn
        const targetSection = document.getElementById(targetId);
        const targetNav = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        
        if (targetSection) targetSection.classList.add('active');
        if (targetNav) targetNav.classList.add('active');

        // Cuộn mượt lên đầu nội dung sau khi chuyển trang
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Tự động đóng menu trên Mobile (nếu đang mở)
        navMenu.classList.remove('active');
    }

    // Gán sự kiện click cho các link trên Navbar
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn trình duyệt nhảy link mặc định
            const targetId = this.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // Click vào Logo -> Về Home
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection('home');
    });

    // --- 2. MENU MOBILE (Icon Quyển sách) ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // --- 3. NÚT LÊN ĐẦU TRANG (Back to top) ---
    const backToTopBtn = document.getElementById('back-to-top');

    // Hiện/Ẩn nút khi cuộn
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Click nút để cuộn lên mượt mà
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
