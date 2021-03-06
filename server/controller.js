module.exports = {
  friendsList: (req, res, next) => {
    const db = req.app.get('db');

    db.get_friends(req.user.user_id)
    .then(friends => { res.status(200).send(friends);})
    .catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  addFriend: (req, res, next) => {
    const db = req.app.get('db');

    db.add_friend(req.user.user_id, req.body.friendID)
    .then(users => {
      db.get_user_list(req.user.user_id, req.body.offset)
      .then(users => { res.status(200).send(users);})
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      });
      console.log('user offset #', req.body.offset)
    })
    .catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  removeFriend: (req, res, next) => {
    const db = req.app.get('db');
    db.del_user_friend(req.user.user_id, req.body.friendID)
    .then(users => {
      db.get_user_list(req.user.user_id, req.body.offset)
      .then(users => { res.status(200).send(users);})
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      });
    })
    .catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  editUserProfile: (req, res, next) => {
    const db = req.app.get('db');

    db.update_profile(req.params.id,
                      req.body.first_name,
                      req.body.last_name,
                      req.body.gender,
                      req.body.hair_color,
                      req.body.eye_color,
                      req.body.hobby,
                      req.body.birth_day,
                      req.body.birth_month,
                      req.body.birth_year)
    .then(edits => { res.status(200).send(edits);})
    .catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  listUsers: (req, res, next) => {
    const db = req.app.get('db');

    db.get_user_list(req.user.user_id, req.body.userOffset)
    .then(users => { res.status(200).send(users);})
    .catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
  },
  
  totNumOfUsers: (req, res, next) => {
    const db = req.app.get('db');
    
    db.get_num_users()
    .then(totalNum => {res.status(200).send(totalNum);})
    .catch(err => {
      console.log (err);
      res.status(500).send(err);
    }); 
  },

  searchUsers: (req, res, next) => {
    if(req.body.searchSelection === 'first_name'){
      const db = req.app.get('db');
      db.get_searched_firstName(req.body.searchInput)
      .then(searchedUser => {res.status(200).send(searchedUser);})
      .catch(err => {
        console.log (err);
        res.status(500).send(err);
      }); 
  } else {
      const db = req.app.get('db');
      db.get_searched_lastName(req.body.searchInput)
      .then(searchedUser => {res.status(200).send(searchedUser);})
      .catch(err => {
        console.log (err);
        res.status(500).send(err);
      });
    }
  },

  recFriendList: (req, res, next) => {
    const db = req.app.get('db');
    console.log(req.user)
    db.get_rec_friends(req.user.user_id)
    .then(rec_friends => {res.status(200).send(rec_friends);})
    .catch(err => {
      console.log (err);
      res.status(500).send(err);
    }); 
  },

  addRecFriend: (req, res, next) => {
    const db = req.app.get('db');    

    db.add_friend(req.user.user_id, req.body.friendID)
    .then(friends => {
      db.get_rec_friends(req.user.user_id)
      .then(rec_friends => {res.status(200).send(rec_friends);})
      .catch(err => {
        console.log (err);
        res.status(500).send(err);
      })
    })
    .catch(err => {
      console.log (err);
      res.status(500).send(err);
    });  
  }
}