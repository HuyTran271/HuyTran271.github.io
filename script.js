document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.getElementById('back-to-top');

    // 1. Chuyển đổi Section khi Click Menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Xóa active cũ
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));

            // Thêm active mới
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active-section');

            // Đóng mobile menu nếu đang mở
            navMenu.classList.remove('active');

            // Cuộn mượt lên đầu trang khi đổi section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. Mobile Menu Toggle (Biểu tượng quyển sách)
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 3. Hiệu ứng Nút Back to Top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Hiệu ứng Animation khi click Logo để quay về Home
    document.querySelector('.logo').addEventListener('click', () => {
        navLinks[0].click();
    });
});