
function loadingstate(req, res) {
  res.send('loading..');

  setTimeout(function() {
    console.log('Process completed!');
  }, 5000);
}

function errorstate(err, req, res) {
  res.status(500).send('Error!');
}

export default
  loadingstate
  ;