module.exports = {
  loginUser: (req, res, next) => {

  },

  logoutUser: (req, res, next) => {
    const db = req.app.get('db');

  },

  friendsList: (req, res, next) => {
    const db = req.app.get('db');

    db.get_friends(req.user_id)
    .then(friends => { res.status(200).send(friends);})
    .catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  addFriend: (req, res, next) => {
    const db = req.app.get('db');

  },

  removeFriend: (req, res, next) => {
    const db = req.app.get('db');

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

    db.get_user_list(req.params)
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
    const db = req.app.get('db');

  },

  recFriendList: (req, res, next) => {
    const db = req.app.get('db');

    
  },

  addRecFriend: (req, res, next) => {
    const db = req.app.get('db');    

  }
}