const express = require('express');
const formidable = require('express-formidable');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

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

app.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  fs.readFile('./data/posts.json', (error, file) => {
    parsedFile = JSON.parse(file);
    postContent = parsedFile[postId];
    res.send(postContent);
    res.render('post', {post: postContent});
  });
});

app.post('/create-post', (req,res) => {
  fs.readFile('./data/posts.json', (error, file) => {
    const parsedFile = JSON.parse(file);
    const timestamp = Date.now();
    parsedFile[timestamp] = req.fields.blogspot;
    const stringifiedFile = JSON.stringify(parsedFile);
    fs.writeFile('./data/posts.json', stringifiedFile, (error) => {
      if (error) {
        res.send('there was an error, try again')
      }
      res.send(stringifiedFile)
    });
  });
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});

