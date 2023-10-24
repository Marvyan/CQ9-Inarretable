document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('venue-registration-form');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:3000/venue-registration', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        confirmation.style.display = 'block';
        form.reset();
      } else {
        console.error('Venue registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  });
});
