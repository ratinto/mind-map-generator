// Test script to login and set localStorage
const testLogin = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: 'testuser', 
        password: 'testpass123' 
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);
      
      // Store in localStorage
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('username', data.username);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      
      console.log('Stored in localStorage:', {
        user_id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username'),
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token')
      });
      
      // Reload page to test persistence
      setTimeout(() => {
        console.log('Reloading page to test session persistence...');
        window.location.reload();
      }, 2000);
    } else {
      console.error('Login failed:', await response.text());
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Run the test
testLogin();
