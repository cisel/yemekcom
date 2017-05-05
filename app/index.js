var xhr = new XMLHttpRequest();
var comments = 'There are not any comments yet!';

function parseDate(date) {
  var d = new Date(parseInt(date.replace(/\/Date\(/g, '').replace(')/', ''), 10));
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + (1900 + d.getYear()) + ' ' + d.getHours() + ':' + d.getMinutes();
}

function createComment(comments, c) {
  comments += '<div class="comment" id="' + c.Id + '">';
  comments += '<span class="user-name">' + c.User.DisplayName + '</span>';
  comments += '<span class="comment-date">' + parseDate(c.Date) +'</span>';
  comments += '<img class="user-avatar" src="' + c.User.AvatarImageUrl + '">';
  comments += '<p class="comment-content">' + c.Content + '</p>';
  comments += '</div>';
  return comments;
}

function addComment(e) {
  e.preventDefault();
  var now = Date.now();
  var c = {
    User: {
      DisplayName: document.getElementById('username').value,
      AvatarImageUrl: 'http://cdn.yemek.com/assets/images/profile-default.jpg'
    },
    Content: document.getElementById('comment').value,
    Id: 'willBeAssignedOnServer',
    Date: '/Date(' + now + '-0000)/'
  };

  comments = createComment(comments, c);
  document.getElementById('comments').innerHTML = comments;

  document.getElementById('username').value = '';
  document.getElementById('comment').value = '';
}

xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var res = JSON.parse(xhr.responseText);
    document.getElementById('image').src = res.Image
    document.getElementById('title').innerHTML = res.Title;
    document.getElementById('content').innerHTML = res.Content;
    if (res.Comments.length) {
      comments = '';
      for (var i = 0; i < res.Comments.length; i += 1) {
        var c = res.Comments[i];
        comments = createComment(comments, c);
      }
    }
    document.getElementById('comments').innerHTML = comments;
  }
};
xhr.open('GET', './data/data.json', true);
xhr.send();
