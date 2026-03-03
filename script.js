document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.getElementById('back-to-top');

    // 1. Chuyển section khi click nav
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // xóa trạng thái active
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // set active mới
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');

            // đóng menu mobile nếu mở
            navMenu.classList.remove('active');

            // cuộn lên đầu trang mỗi lần đổi section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. Toggle mobile menu khi bấm icon
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 3. Hiển thị nút back-to-top khi cuộn
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

    // 4. click logo => về Home
    document.querySelector('.logo').addEventListener('click', () => {
        navLinks[0].click();
    });
});
