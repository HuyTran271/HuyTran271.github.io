// Hàm chuyển đổi Section chuẩn
function switchSection(targetId) {
    // 1. Xóa class active của các section
    sections.forEach(sec => {
        sec.classList.remove('active'); // HTML của bạn dùng class 'active'
    });

    // 2. Xóa class active của nav links
    navLinks.forEach(link => link.classList.remove('active'));

    // 3. Kích hoạt section và link mới
    const targetSection = document.getElementById(targetId);
    const targetNav = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
    if (targetNav) {
        targetNav.classList.add('active');
    }

    // 4. Cuộn lên đầu
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 5. Đóng menu mobile (nếu đang mở)
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('active');
}
