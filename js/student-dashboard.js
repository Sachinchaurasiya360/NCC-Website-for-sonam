document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'student') {
        window.location.href = 'student-login.html';
        return;
    }

    // Update profile information
    document.getElementById('studentName').textContent = user.name || 'Student Name';
    document.getElementById('studentEmail').textContent = user.email || 'student@example.com';
    document.getElementById('studentRoll').textContent = user.rollNumber || 'Roll Number';

    // Handle profile form submission
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            fullName: document.getElementById('fullName').value,
            rollNumber: document.getElementById('rollNumber').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            address: document.getElementById('address').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/student/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            alert('Profile updated successfully!');
        } catch (error) {
            alert(error.message);
        }
    });

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'student-login.html';
    });

    // Handle navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('href').substring(1);
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');

            // Handle section navigation
            switch(section) {
                case 'profile':
                    // Already on profile section
                    break;
                case 'attendance':
                    // Load attendance data
                    loadAttendanceData();
                    break;
                case 'events':
                    // Load events data
                    loadEventsData();
                    break;
                case 'documents':
                    // Load documents data
                    loadDocumentsData();
                    break;
                case 'settings':
                    // Load settings data
                    loadSettingsData();
                    break;
            }
        });
    });

    // Function to load attendance data
    async function loadAttendanceData() {
        try {
            const response = await fetch('http://localhost:3000/api/student/attendance', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // Update attendance section with data
            console.log('Attendance data:', data);
        } catch (error) {
            console.error('Error loading attendance:', error);
        }
    }

    // Function to load events data
    async function loadEventsData() {
        try {
            const response = await fetch('http://localhost:3000/api/student/events', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // Update events section with data
            console.log('Events data:', data);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }

    // Function to load documents data
    async function loadDocumentsData() {
        try {
            const response = await fetch('http://localhost:3000/api/student/documents', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // Update documents section with data
            console.log('Documents data:', data);
        } catch (error) {
            console.error('Error loading documents:', error);
        }
    }

    // Function to load settings data
    async function loadSettingsData() {
        try {
            const response = await fetch('http://localhost:3000/api/student/settings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // Update settings section with data
            console.log('Settings data:', data);
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }
}); 