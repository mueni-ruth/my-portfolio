// Portfolio JavaScript with Profile Picture and Social Links

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize form handling
    initForm();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize profile editing
    initProfileEditing();
    
    // Load saved profile data
    loadProfileData();
});

// Animation functions
function initAnimations() {
    const cards = document.querySelectorAll('.card, .profile-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
    
    // Add typing effect to the profile name
    const profileName = document.querySelector('.profile-card h2');
    if (profileName) {
        const originalText = profileName.textContent;
        profileName.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                profileName.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Form handling
function initForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Interactive elements
function initInteractiveElements() {
    // Add click effect to skill tags
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        skill.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effect to project items
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(108, 99, 255, 0.3)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(42, 42, 60, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });
}

// Profile editing functionality
function initProfileEditing() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileModal = document.getElementById('profileModal');
    const closeModal = document.getElementById('closeModal');
    const profileForm = document.getElementById('profileForm');
    const profileUpload = document.getElementById('profileUpload');
    
    // Open modal
    editProfileBtn.addEventListener('click', function() {
        profileModal.style.display = 'block';
        populateProfileForm();
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
    
    // Handle profile form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileData();
        profileModal.style.display = 'none';
        showNotification('Profile updated successfully!', 'success');
    });
    
    // Handle profile picture upload
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profilePicture = document.getElementById('profilePicture');
                profilePicture.src = e.target.result;
                // Save to localStorage
                localStorage.setItem('profilePicture', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Populate profile form with current data
function populateProfileForm() {
    document.getElementById('editName').value = document.getElementById('userName').textContent;
    document.getElementById('editTitle').value = document.getElementById('userTitle').textContent;
    document.getElementById('editAbout').value = document.getElementById('aboutText').textContent;
    
    // Social links
    document.getElementById('editGithub').value = document.getElementById('githubLink').href;
    document.getElementById('editLinkedin').value = document.getElementById('linkedinLink').href;
    document.getElementById('editTwitter').value = document.getElementById('twitterLink').href;
    document.getElementById('editDribbble').value = document.getElementById('dribbbleLink').href;
    
    // Stats
    document.getElementById('editProjects').value = document.getElementById('projectCount').textContent;
    document.getElementById('editExperience').value = document.getElementById('experienceYears').textContent;
}

// Save profile data
function saveProfileData() {
    // Update profile info
    document.getElementById('userName').textContent = document.getElementById('editName').value;
    document.getElementById('userTitle').textContent = document.getElementById('editTitle').value;
    document.getElementById('aboutText').textContent = document.getElementById('editAbout').value;
    
    // Update social links
    document.getElementById('githubLink').href = document.getElementById('editGithub').value;
    document.getElementById('linkedinLink').href = document.getElementById('editLinkedin').value;
    document.getElementById('twitterLink').href = document.getElementById('editTwitter').value;
    document.getElementById('dribbbleLink').href = document.getElementById('editDribbble').value;
    
    // Update stats
    document.getElementById('projectCount').textContent = document.getElementById('editProjects').value;
    document.getElementById('experienceYears').textContent = document.getElementById('editExperience').value;
    
    // Save to localStorage
    const profileData = {
        name: document.getElementById('editName').value,
        title: document.getElementById('editTitle').value,
        about: document.getElementById('editAbout').value,
        github: document.getElementById('editGithub').value,
        linkedin: document.getElementById('editLinkedin').value,
        twitter: document.getElementById('editTwitter').value,
        dribbble: document.getElementById('editDribbble').value,
        projects: document.getElementById('editProjects').value,
        experience: document.getElementById('editExperience').value
    };
    
    localStorage.setItem('portfolioProfile', JSON.stringify(profileData));
}

// Load profile data from localStorage
function loadProfileData() {
    const savedProfile = localStorage.getItem('portfolioProfile');
    const savedPicture = localStorage.getItem('profilePicture');
    
    if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        
        // Update profile info
        document.getElementById('userName').textContent = profileData.name;
        document.getElementById('userTitle').textContent = profileData.title;
        document.getElementById('aboutText').textContent = profileData.about;
        
        // Update social links
        document.getElementById('githubLink').href = profileData.github;
        document.getElementById('linkedinLink').href = profileData.linkedin;
        document.getElementById('twitterLink').href = profileData.twitter;
        document.getElementById('dribbbleLink').href = profileData.dribbble;
        
        // Update stats
        document.getElementById('projectCount').textContent = profileData.projects;
        document.getElementById('experienceYears').textContent = profileData.experience;
    }
    
    if (savedPicture) {
        document.getElementById('profilePicture').src = savedPicture;
    }
}

// Default profile data (if no data is saved)
function setDefaultProfileData() {
    const defaultData = {
        name: "Your Name",
        title: "Frontend Developer & UI/UX Designer",
        about: "I'm a passionate frontend developer with expertise in creating modern, responsive web applications. I love turning complex problems into simple, beautiful designs.",
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
        dribbble: "https://dribbble.com/yourusername",
        projects: "12",
        experience: "3"
    };
    
    localStorage.setItem('portfolioProfile', JSON.stringify(defaultData));
    loadProfileData();
}

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'var(--primary)';
    } else if (type === 'error') {
        notification.style.background = 'var(--accent)';
    } else {
        notification.style.background = 'var(--dark)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Set default data if no profile exists
if (!localStorage.getItem('portfolioProfile')) {
    setDefaultProfileData();
}