
import express from 'express';

function longRunningProcess() {
  console.log('Loading...');
//   res.render('loading');
//   res.send("loading");
body.innerHTML="<p>PPPPPP</p>"

  // simulate a long-running process
  setTimeout(function() {
    console.log('Process completed!');
  }, 5000);
}


export {longRunningProcess} ;