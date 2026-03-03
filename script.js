// Đợi HTML tải xong mới chạy script
document.addEventListener('DOMContentLoaded', () => {
    
    // Lấy các element cần thiết
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const logo = document.querySelector('.logo');

    // 1. LOGIC SPA: Chuyển Section khi click Nav
    function switchSection(targetId) {
        // Xóa class active ở tất cả các section và nav link
        sections.forEach(sec => sec.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Thêm class active cho section được chọn
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
            targetSection.classList.add('active');
        }

        // Thêm class active cho nav link tương ứng
        const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if(targetLink) {
            targetLink.classList.add('active');
        }

        // Cuộn mượt lên đầu trang sau khi chuyển tab
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Tự động đóng menu trên mobile sau khi click
        navMenu.classList.remove('active');
    }

    // Lắng nghe sự kiện click trên các nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn hành vi nhảy trang mặc định
            const targetId = this.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // Click vào Logo thì quay về Home
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection('home');
    });

    // 2. LOGIC MOBILE MENU: Đóng/Mở menu quyển sách
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 3. LOGIC BACK TO TOP BUTTON
    // Hiện nút khi cuộn xuống 100px
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Click nút thì cuộn mượt lên đầu
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
