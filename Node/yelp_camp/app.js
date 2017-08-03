const express = require('express');
const app = express();

// temp array for building campgrounds

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  const campgrounds = [
    { name: 'Salmon Creek', image: 'https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg' },
    { name: 'Goats Breath', image: 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg' },
    { name: 'Bears Water', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg' }
  ]
  res.render('campgrounds', { campgrounds: campgrounds })
});

app.post('/campgrounds', (req, res) => {
  res.send('This is the post route.');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});