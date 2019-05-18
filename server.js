const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs');
const app = express();


app.use(express.static("public"));
app.use(formidable());

app.get('/get-posts', (req, res) => {
   res.sendFile(__dirname + '/data/posts.json', (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
   });
});

app.post('/create-post', (req,res) => {
  fs.readFile('./data/posts.json', (error, file) => {
    const parsedFile = JSON.parse(file);
    const timestamp = Date.now().toString();
    parsedFile[timestamp] = req.fields.blogspot;
    console.log(parsedFile);
    fs.writeFile('./data/posts.json', JSON.stringify(parsedFile), (error) => {
      if (error) {
        res.send('there was an error, try again')
      } else {
        res.send('Success, your post has been saved')
      }
    });
  });
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});

