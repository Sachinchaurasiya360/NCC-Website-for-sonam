document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'admin') {
        window.location.href = 'admin-login.html';
        return;
    }

    // Load initial data
    loadDashboardData();
    loadStudentsList();

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'admin-login.html';
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
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'students':
                    loadStudentsList();
                    break;
                case 'attendance':
                    loadAttendanceData();
                    break;
                case 'events':
                    loadEventsData();
                    break;
                case 'reports':
                    loadReportsData();
                    break;
                case 'settings':
                    loadSettingsData();
                    break;
            }
        });
    });

    // Handle add student form submission
    const addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                rollNumber: addStudentForm.querySelector('input[type="text"]').value,
                name: addStudentForm.querySelector('input[type="text"]:nth-child(2)').value,
                email: addStudentForm.querySelector('input[type="email"]').value,
                phoneNumber: addStudentForm.querySelector('input[type="tel"]').value,
                address: addStudentForm.querySelector('textarea').value
            };

            try {
                const response = await fetch('http://localhost:3000/api/admin/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to add student');
                }

                // Close modal and refresh students list
                const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
                modal.hide();
                loadStudentsList();
                alert('Student added successfully!');
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Function to load dashboard data
    async function loadDashboardData() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            // Update dashboard stats
            document.querySelector('.stat-item:nth-child(1) h4').textContent = data.totalStudents;
            document.querySelector('.stat-item:nth-child(2) h4').textContent = data.presentToday;
            document.querySelector('.stat-item:nth-child(3) h4').textContent = data.upcomingEvents;
            document.querySelector('.stat-item:nth-child(4) h4').textContent = data.pendingTasks;
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    // Function to load students list
    async function loadStudentsList() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/students', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            // Update students table
            const tableBody = document.getElementById('studentsTableBody');
            tableBody.innerHTML = data.students.map(student => `
                <tr>
                    <td>${student.rollNumber}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.attendance}%</td>
                    <td><span class="badge bg-${student.status === 'Active' ? 'success' : 'danger'}">${student.status}</span></td>
                    <td class="action-buttons">
                        <button class="btn btn-sm btn-primary" onclick="editStudent('${student._id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-info" onclick="viewStudent('${student._id}')"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student._id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error loading students list:', error);
        }
    }

    // Function to load attendance data
    async function loadAttendanceData() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/attendance', {
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
            const response = await fetch('http://localhost:3000/api/admin/events', {
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

    // Function to load reports data
    async function loadReportsData() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/reports', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // Update reports section with data
            console.log('Reports data:', data);
        } catch (error) {
            console.error('Error loading reports:', error);
        }
    }

    // Function to load settings data
    async function loadSettingsData() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/settings', {
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

    // Handle search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(async (e) => {
            const searchTerm = e.target.value;
            try {
                const response = await fetch(`http://localhost:3000/api/admin/students/search?q=${searchTerm}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                // Update students table with search results
                loadStudentsList();
            } catch (error) {
                console.error('Error searching students:', error);
            }
        }, 300));
    }
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 