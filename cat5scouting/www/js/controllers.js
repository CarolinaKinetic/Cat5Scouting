/*
  Much of the code in this file and services.js that has to do with SQLite is
  derived from the gist created by Borris Sondagh, here: 
  https://gist.github.com/borissondagh/29d1ed19d0df6051c56f
*/
angular.module('cat5scouting.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope, $stateParams) {
  
})

.controller('MatchCtrl', function($scope, Team) {
  $scope.teams = [];
  $scope.teams = null;
  
  $scope.updateTeam = function() {
    Team.all().then(function(teams) {
      $scope.teams = teams;
    })
  }
  
  $scope.updateTeam();
})


//TODO: Disable all fields except Team until team is selected
//TODO: Disable all fields except Team and Robot until Robot is selected
.controller('PitCtrl', function($scope, Team) {
  $scope.teams = [];
  $scope.teams = null;
  
  $scope.updateTeam = function() {
    Team.all().then(function(teams) {
      $scope.teams = teams;
    })
  }
  
  $scope.updateTeam();
})



.controller('SyncCtrl', function($scope, $cordovaFile, $cordovaToast, Robot, 
  RobotMatch) {
  
  document.addEventListener('deviceready', function() {

    $scope.getDateString = function() {
      var d = new Date(),
      minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
      hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),      
      months = ['01','02','03','04','05','06','07','08','09','10','11','12'];

      return d.getFullYear()+'-'+months[d.getMonth()]+'-'+d.getDate()+'-'+hours+'-'+minutes;
    }


    $scope.exportData = function() {
      //let the user know that data is exporting
      $cordovaToast.showShortTop('Hang on... data is exporting');      

      //Create file name that includes the date the file was created
      //TODO: Add the tablet that the data came from
      var pitFilename = "Cat5Scouting.Pit." + $scope.getDateString() + ".txt";
      var filePath = "file:///storage/emulated/0/";

      //create the file to write to
      //Create the exported Robot data to write to a file
      var exportData1 = "Robot Name\tTeam ID\tRuns in Autonomous\t";
      exportData1 += "Comments about drive type\tHeight\tNotes\t";
      exportData1 += "Autonomous - Low Bar\tAutonomous - Chival de frise\t";
      exportData1 += "Autonomous - Moat\tAutonomous - Ramparts\t";
      exportData1 += "Autonomous - Drawbridge\tAutonomous - Sally port\t";
      exportData1 += "Autonomous - Portcullis\tAutonomous - Rock wall\t";
      exportData1 += "Autonomous - Rough terrain\t";
      exportData1 += "Teleop - Low Bar\tTeleop - Chival de frise\t";
      exportData1 += "Teleop - Moat\tTeleop - Ramparts\t";
      exportData1 += "Teleop - Drawbridge\tTeleop - Sally port\t";
      exportData1 += "Teleop - Portcullis\tTeleop - Rock wall\t";
      exportData1 += "Teleop - Rough terrain\t";
      exportData1 += "Auto score - Top left\tAuto score - Top middle\t";
      exportData1 += "Auto score - Top right\tAuto score - Bottom left\t";
      exportData1 += "Auto score - Bottom middle\tAuto score - Bottom right\t";
      exportData1 += "Score in top\tScore in bottom\tPick up from floor\t";
      exportData1 += "Pick up from secret passageway\tWilling to defend\t";
      exportData1 += "Scales tower\tRequires spy to guide\tHas spy doc\r\n";
      Robot.all().then(function(robots) {
        for (var i=0; i<robots.length; i++) {          
          exportData1 += robots[i].name;
          exportData1 += "\t";
          exportData1 += robots[i].teamId;
          exportData1 += "\t";
          exportData1 += robots[i].runAuto;
          exportData1 += "\t";
          exportData1 += robots[i].driveType;
          exportData1 += "\t";
          exportData1 += robots[i].height;
          exportData1 += "\t";
          exportData1 += robots[i].notes;
          exportData1 += "\t";
          exportData1 += robots[i].spyReq;
          exportData1 += "\t";
          exportData1 += robots[i].spyDoc;
          exportData1 += "\t";
          exportData1 += robots[i].OWA1;
          exportData1 += "\t";
          exportData1 += robots[i].OWA2;
          exportData1 += "\t";
          exportData1 += robots[i].OWA3;
          exportData1 += "\t";
          exportData1 += robots[i].OWA4;
          exportData1 += "\t";
          exportData1 += robots[i].OWA5;
          exportData1 += "\t";
          exportData1 += robots[i].OWA6;
          exportData1 += "\t";
          exportData1 += robots[i].OWA7;
          exportData1 += "\t";
          exportData1 += robots[i].OWA8;
          exportData1 += "\t";
          exportData1 += robots[i].OWA9;
          exportData1 += "\t";
          exportData1 += robots[i].OWT1;
          exportData1 += "\t";
          exportData1 += robots[i].OWT2;
          exportData1 += "\t";
          exportData1 += robots[i].OWT3;
          exportData1 += "\t";
          exportData1 += robots[i].OWT4;
          exportData1 += "\t";
          exportData1 += robots[i].OWT5;
          exportData1 += "\t";
          exportData1 += robots[i].OWT6;
          exportData1 += "\t";
          exportData1 += robots[i].OWT7;
          exportData1 += "\t";
          exportData1 += robots[i].OWT8;
          exportData1 += "\t";
          exportData1 += robots[i].OWT9;
          exportData1 += "\t";
          exportData1 += robots[i].scoreTL;
          exportData1 += "\t";
          exportData1 += robots[i].scoreTM;
          exportData1 += "\t";
          exportData1 += robots[i].scoreTR;
          exportData1 += "\t";
          exportData1 += robots[i].scoreBL;
          exportData1 += "\t";
          exportData1 += robots[i].scoreBM;
          exportData1 += "\t";
          exportData1 += robots[i].scoreBR;
          exportData1 += "\t";
          exportData1 += robots[i].scoreTop;
          exportData1 += "\t";
          exportData1 += robots[i].scoreBottom;
          exportData1 += "\t";
          exportData1 += robots[i].scale;
          exportData1 += "\t";
          exportData1 += robots[i].pickupF;
          exportData1 += "\t";
          exportData1 += robots[i].pickupS;
          exportData1 += "\t";
          exportData1 += robots[i].defense;
          exportData1 += "\t";
          exportData1 += robots[i].spy;
          exportData1 += "\r\n";
        }
      }).then(function() {
        $cordovaFile.writeFile(filePath, pitFilename, exportData1, true)
          .then(function (success) {
            console.log("Text successfully written to Pit file");
          }, function (error) {
            console.log("Problem writing text to Pit file");
            console.log(error);
          });       
      });


  

      //Create the exported Robot Match data to write to a file
      exportData2 = "match ID\trobot ID\tteam ID\t# boulders thru low goal\t";
      exportData2 += "# boulders thru high goal\t# times across low bar in Auto\t";
      exportData2 += "# times across portcullis in Auto\t# times across chival de frise in Auto\t";
      exportData2 += "# times across the moat in Auto\t# times across rock wall in Auto\t";
      exportData2 += "# times across rough terrain in Auto\t# times across sally port in Auto\t";
      exportData2 += "# times across rampart in Auto\t# times across drawbridge in Auto\t";
      exportData2 += "# times across low bar in Tele\t";
      exportData2 += "# times across portcullis in Tele\t# times across chival de frise in Tele\t";
      exportData2 += "# times across the moat in Tele\t# times across rock wall in Tele\t";
      exportData2 += "# times across rough terrain in Tele\t# times across sally port in Tele\t";
      exportData2 += "# times across rampart in Tele\t";
      exportData2 += "# times across drawbridge in Tele\tScaled tower\tChallenged tower";
      exportData2 += "How well boulders from floor\tHow well boulders from secret passageway\t";
      exportData2 += "# fouls generated\tRobot broken?\tHow well did defense?\t";
      exportData2 += "How well did team spy communicate?\tHow well did drive team use spy?\r\n";
      RobotMatch.all().then(function(matches) {
        for (var i=0; i<matches.length; i++) {
          exportData2 += matches[i].matchId;
          exportData2 += "\t";
          exportData2 += matches[i].robotId;
          exportData2 += "\t";
          exportData2 += matches[i].teamId;
          exportData2 += "\t";
          exportData2 += matches[i].numLow;
          exportData2 += "\t";
          exportData2 += matches[i].numHigh;
          exportData2 += "\t";
          exportData2 += matches[i].lowBarA;
          exportData2 += "\t";
          exportData2 += matches[i].portA;
          exportData2 += "\t";
          exportData2 += matches[i].chevA;
          exportData2 += "\t";
          exportData2 += matches[i].moatA;
          exportData2 += "\t";
          exportData2 += matches[i].rockA;
          exportData2 += "\t";
          exportData2 += matches[i].roughA;
          exportData2 += "\t";
          exportData2 += matches[i].sallyA;
          exportData2 += "\t";
          exportData2 += matches[i].rampA;
          exportData2 += "\t";
          exportData2 += matches[i].drawA;
          exportData2 += "\t";
          exportData2 += matches[i].lowBarT;
          exportData2 += "\t";
          exportData2 += matches[i].portT;
          exportData2 += "\t";
          exportData2 += matches[i].chevT;
          exportData2 += "\t";
          exportData2 += matches[i].moatT;
          exportData2 += "\t";
          exportData2 += matches[i].rockT;
          exportData2 += "\t";
          exportData2 += matches[i].roughT;
          exportData2 += "\t";
          exportData2 += matches[i].sallyT;
          exportData2 += "\t";
          exportData2 += matches[i].rampT;
          exportData2 += "\t";
          exportData2 += matches[i].drawT;
          exportData2 += "\t";
          exportData2 += matches[i].scaled;
          exportData2 += "\t";
          exportData2 += matches[i].challenge;
          exportData2 += "\t";
          exportData2 += matches[i].bFloor;
          exportData2 += "\t";
          exportData2 += matches[i].bSecret;
          exportData2 += "\t";
          exportData2 += matches[i].numF;
          exportData2 += "\t";
          exportData2 += matches[i].borked;
          exportData2 += "\t";
          exportData2 += matches[i].defense;
          exportData2 += "\t";
          exportData2 += matches[i].spyComm1;
          exportData2 += "\t";
          exportData2 += matches[i].spyComm2;
          exportData2 += "\t";
        }
      }).then(function() {
        var matchFilename = "Cat5Scouting.Match." + $scope.getDateString() + ".txt";
        $cordovaFile.writeFile(filePath, matchFilename, exportData2, true)
          .then(function (success) {
            console.log("Text successfully written to Match file");
          }, function (error) {
            console.log("Problem writing text to Match file");
            console.log(error);
          });
      })      

      //let the user know that the data is done exporting
      $cordovaToast.showShortTop('OK... data is done exporting');
    }
  })

})



.controller('SettingsCtrl', function($scope, $stateParams, $cordovaSQLite, 
  $cordovaToast) {

  $scope.generateSampleData = function() {
    console.log("generateSampleData called");

    
    //create a toast notifier to let the user know to wait while data loads
    $cordovaToast.showShortTop('Hang on a sec... data loading').then(function(success) {
      //do nothing
    }, function (error) {
      //do nothing
    });
    

    var teams = [
                  1225, 1226, 1293, 1398, 1553, 1598, 1758, 2059, 281, 2815, 
                  283, 342, 343, 3489, 3490, 3976, 4083, 4451, 4533, 4534, 
                  4901, 4935, 4955, 4965, 8101
                ];
                
    var query = "INSERT INTO team (name, number) VALUES (?,?)";
    for (var i=0; i<teams.length; i++) {
      $cordovaSQLite.execute(db, query, ["Team "+ teams[i], i]).then(function(res) {
        console.log("team insertId: " + res.insertId);
      }, function (err) {
        console.error(err);
      });
    }
    
    var query = "INSERT INTO robot (name, teamId) VALUES (?,?)";
    for (var i=1; i<=teams.length; i++) {
      console.log("i = " + i);
      $cordovaSQLite.execute(db, query, ["Robot", i]).then(function(res) {
        console.log("robot insertId: " + res.insertId + " with teamId: " + i);
      }, function (err) {
        console.error(err);
      });
    }


    for (var i=1; i<32; i++) {
      var query = "INSERT INTO match (number) VALUES (?)";
      $cordovaSQLite.execute(db, query, [i]).then(function(res) {
        console.log("match insertId: " + res.insertId);
      }, function (err) {
        console.error(err);
      });
    }

    //create a toast notifier to let the user know that the data is done loading
    $cordovaToast.showShortTop('OK... data is done loading').then(function(success){
      //do nothing
    }, function (error) {
      //do nothing
    });
  }  

})




.controller('PitScoutingController', function($scope, $stateParams, Robot) {
  ///TODO Convert these to SQLite database calls
  /*
    teamName: the name of the team; values provided via PitCtrl controller
    robotName: the name of the robot that a team has
    
  */
  
  $scope.robot = [];
  $scope.robot = null;
  
  //TODO: Add a field for "is the robot still fully functional?"
  //TODO: Investigate if iPhones and iPads can export to thumb drives
  //TODO: Capture images on the Pit Scouting page
  //TODO: Picklist for quickly choosing the best matches

  $scope.data = {
    yesNo: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: 'Yes'},
      {id: '2', name: 'No'}
    ]
  }

  /*
  $scope.owaList = [
    {label: "Low bar", selected: false, code: 'OWA1'}, 
    {label: "Chival de frise", selected: false, code: 'OWA2'}, 
    {label: "Moat", selected: false, code: 'OWA3'}
  ];
  */

  $scope.owaList = [
    {name: "OWA1", checked: 0, label: "Low bar"},
    {name: "OWA2", checked: 0, label: "Chival de frise"},
    {name: "OWA3", checked: 0, label: "Moat"},
    {name: "OWA4", checked: 0, label: "Ramparts"},
    {name: "OWA5", checked: 0, label: "Drawbridge"},
    {name: "OWA6", checked: 0, label: "Sally port"},
    {name: "OWA7", checked: 0, label: "Portcullis"},
    {name: "OWA8", checked: 0, label: "Rock wall"},
    {name: "OWA9", checked: 0, label: "Rough terrain"}
  ]

  $scope.owtList = [
    {name: "OWT1", checked: 0, label: "Low bar"},
    {name: "OWT2", checked: 0, label: "Chival de frise"},
    {name: "OWT3", checked: 0, label: "Moat"},
    {name: "OWT4", checked: 0, label: "Ramparts"},
    {name: "OWT5", checked: 0, label: "Drawbridge"},
    {name: "OWT6", checked: 0, label: "Sally port"},
    {name: "OWT7", checked: 0, label: "Portcullis"},
    {name: "OWT8", checked: 0, label: "Rock wall"},
    {name: "OWT9", checked: 0, label: "Rough terrain"}
  ]

  $scope.scorePosition = [
    {name: "scoreTL", checked: 0, label: "Left position, top target"},
    {name: "scoreTM", checked: 0, label: "Middle position, top target"},
    {name: "scoreTR", checked: 0, label: "Right position, top target"},
    {name: "scoreBL", checked: 0, label: "Left position, bottom target"},
    {name: "scoreBM", checked: 0, label: "Middle position, bottom target"},
    {name: "scoreBR", checked: 0, label: "Right position, bottom target"}
  ]

  $scope.pickup = [
    {name: "scoreTop", checked: 0, label: "Top"},
    {name: "scoreBottom", checked: 0, label: "Bottom"}
  ]

  $scope.boulders = [
    {name: "pickupF", checked: 0, label: "Floor"},
    {name: "pickupS", checked: 0, label: "Secret passageway"}
  ]

  $scope.randomQs = [
    {name: "defense", checked: 0, label: "Team is willing to play defense"},
    {name: "scale", checked: 0, label: "Robot scales tower"}
  ]

  /*
    This function is called to determine if non-team and non-robot fields should
    be enabled. If and only if both a team and a robot have been selected, it 
    returns false (meaning don't disable the fields)
  */
  $scope.disableFields = function() {
    return $scope.selectedRobot == null;
  }
  
  /*
    This function is called when the user changes the team. It loads values for
    the Robots fields from the SQLite database and sets the rest of the fields
    to their default values until a robot is selected. 
  */
  $scope.selectTeam = function() {
    //retrieve the robot(s) for the selected team
    Robot.getByTeam($scope.team.id).then(function(robots) {
      $scope.robots = robots;
    })

    //reset the selected robot
    $scope.selectedRobot = null;

    //reset all the subsequent fields
    $scope.runAuto = $scope.data.yesNo[0];
    $scope.driveType = "";
    $scope.height = 0;
    $scope.notes = "";
    $scope.spyReq = 0;
    $scope.spyDoc = 0;
    
    $scope.owaList[0].checked = false;
    $scope.owaList[1].checked = false;
    $scope.owaList[2].checked = false;
    $scope.owaList[3].checked = false;
    $scope.owaList[4].checked = false;
    $scope.owaList[5].checked = false;
    $scope.owaList[6].checked = false;
    $scope.owaList[7].checked = false;
    $scope.owaList[8].checked = false;
    
    $scope.owtList[0].checked = false;
    $scope.owtList[1].checked = false;
    $scope.owtList[2].checked = false;
    $scope.owtList[3].checked = false;
    $scope.owtList[4].checked = false;
    $scope.owtList[5].checked = false;
    $scope.owtList[6].checked = false;
    $scope.owtList[7].checked = false;
    $scope.owtList[8].checked = false;
    
    $scope.scorePosition[0].checked = false;
    $scope.scorePosition[1].checked = false;
    $scope.scorePosition[2].checked = false;
    $scope.scorePosition[3].checked = false;
    $scope.scorePosition[4].checked = false;
    $scope.scorePosition[5].checked = false;
    
    $scope.pickup[0].checked = false;
    $scope.pickup[1].checked = false;

    $scope.boulders[0].checked = false;
    $scope.boulders[1].checked = false;
    
    $scope.randomQs[0].checked = false;
    $scope.randomQs[1].checked = false;

    $scope.spy = $scope.data.yesNo[0];
    $scope.signal = $scope.data.yesNo[0];
  }
  
  /*
    This function is called when the user selects the robot. It loads values for
    the fields from the SQLite database that match the team and robot. If there
    is no record for the selected team/robot combination, it sets all the fields
    to "[Unknown]."
  */
  $scope.selectRobot = function() {
    Robot.getById($scope.selectedRobot.id).then(function(robot) {
      if (robot) {
        //set the current robot
        //$scope.selectedRobot = robot;

        //set the values for the fields in the form based on the database if they
        //exist. Otherwise, set to the unselected value.
        if (robot.runAuto) $scope.runAuto = $scope.data.yesNo[robot.runAuto];
        if (robot.driveType) $scope.driveType = robot.driveType;
        if (robot.height) $scope.height = robot.height;
        if (robot.notes) $scope.notes = robot.notes;
        if (robot.spyReq) $scope.spyReq = $scope.data.yesNo[robot.spyReq];
        if (robot.spyDoc) $scope.spyDoc = $scope.data.yesNo[robot.spyDoc];

        //start with first checkbox array
        $scope.owaList[0].checked = robot.OWA1;
        $scope.owaList[1].checked = robot.OWA2;
        $scope.owaList[2].checked = robot.OWA3;
        $scope.owaList[3].checked = robot.OWA4;
        $scope.owaList[4].checked = robot.OWA5;
        $scope.owaList[5].checked = robot.OWA6;
        $scope.owaList[6].checked = robot.OWA7;
        $scope.owaList[7].checked = robot.OWA8;
        $scope.owaList[8].checked = robot.OWA9;

        //start with second checkbox array
        $scope.owtList[0].checked = robot.OWT1;
        $scope.owtList[1].checked = robot.OWT2;
        $scope.owtList[2].checked = robot.OWT3;
        $scope.owtList[3].checked = robot.OWT4;
        $scope.owtList[4].checked = robot.OWT5;
        $scope.owtList[5].checked = robot.OWT6;
        $scope.owtList[6].checked = robot.OWT7;
        $scope.owtList[7].checked = robot.OWT8;
        $scope.owtList[8].checked = robot.OWT9;

        //start the third checkbox array
        $scope.scorePosition[0].checked = robot.scoreTL;
        $scope.scorePosition[1].checked = robot.scoreTM;
        $scope.scorePosition[2].checked = robot.scoreTR;
        $scope.scorePosition[3].checked = robot.scoreBL;
        $scope.scorePosition[4].checked = robot.scoreBM;
        $scope.scorePosition[5].checked = robot.scoreBR;

        //start the fourth checkbox array
        $scope.pickup[0].checked = robot.scoreTop;
        $scope.pickup[1].checked = robot.scoreBottom;

        //start the fifth checkbox array
        $scope.boulders[0].checked = robot.scale;
        $scope.boulders[1].checked = robot.pickupF;

        //start the sixth checkbox array
        $scope.randomQs[0].checked = robot.pickupS;
        $scope.randomQs[1].checked = robot.defense;
        
        //drop-down list boxes at bottom of screen
        if (robot.spy) $scope.spy = robot.spy;
        if (robot.signal) $scope.signal = robot.signal;
      }
    })
  }
  
  /*
    This function is called each time a field is updated.
  */
  $scope.robotChanged = function() {
    var editRobot = angular.copy($scope.selectedRobot);
    editRobot.runAuto = $scope.runAuto || $scope.data.yesNo[robot.runAuto];
    editRobot.driveType = $scope.driveType || "";
    editRobot.height = $scope.height || 0;
    editRobot.notes = $scope.notes || "";
    editRobot.spyReq = $scope.spyReq || false;
    editRobot.spyDoc = $scope.spyDoc || false;

    editRobot.OWA1 = $scope.owaList[0].checked || false;
    editRobot.OWA2 = $scope.owaList[1].checked || false;
    editRobot.OWA3 = $scope.owaList[2].checked || false;
    editRobot.OWA4 = $scope.owaList[3].checked || false;
    editRobot.OWA5 = $scope.owaList[4].checked || false;
    editRobot.OWA6 = $scope.owaList[5].checked || false;
    editRobot.OWA7 = $scope.owaList[6].checked || false;
    editRobot.OWA8 = $scope.owaList[7].checked || false;
    editRobot.OWA9 = $scope.owaList[8].checked || false;

    editRobot.OWT1 = $scope.owtList[0].checked || false;
    editRobot.OWT2 = $scope.owtList[1].checked || false;
    editRobot.OWT3 = $scope.owtList[2].checked || false;
    editRobot.OWT4 = $scope.owtList[3].checked || false;
    editRobot.OWT5 = $scope.owtList[4].checked || false;
    editRobot.OWT6 = $scope.owtList[5].checked || false;
    editRobot.OWT7 = $scope.owtList[6].checked || false;
    editRobot.OWT8 = $scope.owtList[7].checked || false;
    editRobot.OWT9 = $scope.owtList[8].checked || false;

    editRobot.scoreTL = $scope.scorePosition[0].checked || false;
    editRobot.scoreTM = $scope.scorePosition[1].checked || false;
    editRobot.scoreTR = $scope.scorePosition[2].checked || false;
    editRobot.scoreBL = $scope.scorePosition[3].checked || false;
    editRobot.scoreBM = $scope.scorePosition[4].checked || false;
    editRobot.scoreBR = $scope.scorePosition[5].checked || false;

    editRobot.scoreTop = $scope.pickup[0].checked || false;
    editRobot.scoreBottom = $scope.pickup[1].checked || false;

    editRobot.pickupF = $scope.boulders[0].checked || false;
    editRobot.pickupS = $scope.boulders[1].checked || false;

    editRobot.defense = $scope.randomQs[0].checked || false;
    editRobot.scale = $scope.randomQs[1].checked || false;

    editRobot.spy = $scope.spy || $scope.data.yesNo[robot.spy];
    editRobot.signal = $scope.signal || $scope.data.yesNo[robot.signal];

    Robot.update($scope.selectedRobot, editRobot);
  }
})






.controller('MatchScoutingController', function($scope, $stateParams, Robot, RobotMatch, Match) {
  /*
    teamName: the name of the team
    robotName: the name of the robot that a team has
    matchNum: the match during which data was retrieved
    driveSpeed: how fast the robot can move about the field    
  */
  $scope.data = {
    yesNo: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: 'Yes'},
      {id: '2', name: 'No'}
    ],
    judgment: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: "Didn't"},
      {id: '2', name: 'Poorly'},
      {id: '3', name: 'Well'}
    ]
  }

  //retrieve the robot(s) for the selected team
  $scope.selectTeam = function() {
    //TODO: Push this to a service, as it is copied from the Pit controller and
    //we want DRY code
    Robot.getByTeam($scope.team.id).then(function(robots) {
      $scope.robots = robots;
    })
    
    //reset the selected robot
    //first, copy the existing team and match selection
    var teamCopy = angular.copy($scope.team);
    var matchCopy = angular.copy($scope.match);
    //then reset the data
    //$scope.resetData();
    //then repopulate the selected team and match
    $scope.team = teamCopy;
    $scope.match = matchCopy;
  }
  
  //Pull matches out of the database. They are not dependent on other values,
  //so there is no need to wrap them in a function
  Match.all().then(function(matches) {
    $scope.matches = matches;
  })

  /*
    This function is called when the user changes the robot. It loads values for
    the fields from the SQLite database or, if there is no record for the 
    selected team, it sets all of the fields to [Unknown]. 
  */
  $scope.selectRobot = function() {
    //the if statement skips the contents if this function was triggered by the 
    //field being set to no-value or if both a robot and match haven't been 
    //selectd
    if ($scope.selectedRobot && $scope.match) {
      //retrieve all robot data for the selected robot
      RobotMatch.getById($scope.selectedRobot.id, $scope.match.id).then(function(robot) {
        //verify that a robot was returned instead of null (null = no matching record in the db)
        if (robot) {
          //set the current robot
          $scope.robot = robot;
          
          //set the values for the fields in the form based on the database if they
          //exist. Otherwise, set to the unselected value.
          if (robot.numLow) {
            $scope.numLow = robot.numLow;
          } else {
            $scope.numLow = 0;
          }
          if (robot.numHigh) {
            $scope.numHigh = robot.numHigh;
          } else {
            $scope.numHigh = 0;
          }
          if (robot.lowBarA) {
            $scope.lowBarA = robot.lowBarA;
          } else {
            $scope.lowBarA = 0;
          }
          if (robot.lowBarT) {
            $scope.lowBarT = robot.lowBarT;
          } else {
            $scope.lowBarT = 0;
          }
          if (robot.portA) {
            $scope.portA = robot.portA;
          } else {
            $scope.portA = 0;
          }
          if (robot.portT) {
            $scope.portT = robot.portT;
          } else {
            $scope.portT = 0;
          }
          if (robot.chevA) {
            $scope.chevA = robot.chevA;
          } else {
            $scope.chevA = 0;
          }
          if (robot.chevT) {
            $scope.chevT = robot.chevT;
          } else {
            $scope.chevT = 0;
          }
          if (robot.moatA) {
            $scope.moatA = robot.moatA;
          } else {
            $scope.moatA = 0;
          }
          if (robot.moatT) {
            $scope.moatT = robot.moatT;
          } else {
            $scope.moatT = 0;
          }
          if (robot.rockA) {
            $scope.rockA = robot.rockA;
          } else {
            $scope.rockA = 0;
          }
          if (robot.rockT) {
            $scope.rockT = robot.rockT;
          } else {
            $scope.rockT = 0;
          }
          if (robot.roughA) {
            $scope.roughA = robot.roughA;
          } else {
            $scope.roughA = 0;
          }
          if (robot.roughT) {
            $scope.roughT = robot.roughT;
          } else {
            $scope.roughT = 0;
          }
          if (robot.sallyA) {
            $scope.sallyA = robot.sallyA;
          } else {
            $scope.sallyA = 0;
          }
          if (robot.sallyT) {
            $scope.sallyT = robot.sallyT;
          } else {
            $scope.sallyT = 0;
          }
          if (robot.drawA) {
            $scope.drawA = robot.drawA;
          } else {
            $scope.drawA = 0;
          }
          if (robot.drawT) {
            $scope.drawT = robot.drawT;
          } else {
            $scope.drawT = 0;
          }
          if (robot.scaled) {
            $scope.scaled = robot.scaled;
          } else {
            $scope.scaled = 0;
          }
          if (robot.challenge) {
            $scope.challenge = robot.challenge;
          } else {
            $scope.challenge = 0;
          }
          if (robot.bFloor) {
            $scope.bFloor = robot.bFloor;
          } else {
            $scope.bFloor = $scope.data.judgment[0];;
          }
          if (robot.bSecret) {
            $scope.bSecret = robot.bSecret;
          } else {
            $scope.bSecret = $scope.data.judgment[0];;
          }
          if (robot.numF) {
            $scope.numF = robot.numF;
          } else {
            $scope.numF = 0;
          }
          if (robot.borked) {
            $scope.borked = robot.borked;
          } else {
            $scope.borked = false;
          }
          if (robot.defense) {
            $scope.defense = robot.defense;
          } else {
            $scope.defense = $scope.data.judgment[0];;
          }
          if (robot.spyComm1) {
            $scope.spyComm1 = robot.spyComm1;
          } else {
            $scope.spyComm1 = $scope.data.judgment[0];;
          }
          if (robot.spyComm2) {
            $scope.spyComm2 = robot.spyComm2;
          } else {
            $scope.spyComm2 = $scope.data.judgment[0];;
          }
        } else {
          //if no database record, set all fields to unselected values for the 
          //form to display
          $scope.numLow = 0;
          $scope.numHigh = 0;
          $scope.lowBarA = 0;
          $scope.lowBarT = 0;
          $scope.portA = 0;
          $scope.portT = 0;
          $scope.chevA = 0;
          $scope.chevT = 0;
          $scope.moatA = 0;
          $scope.moatT = 0;
          $scope.rockA = 0;
          $scope.rockT = 0;
          $scope.roughA = 0;
          $scope.roughT = 0;
          $scope.sallyA = 0;
          $scope.sallyT = 0;
          $scope.drawA = 0;
          $scope.drawT = 0;
          $scope.scaled = 0;
          $scope.challenge = 0;
          $scope.bFloor = $scope.data.judgment[0];
          $scope.bSecret = $scope.data.judgment[0];
          $scope.numF = 0;
          $scope.borked = false;
          $scope.defense = $scope.data.judgment[0];
          $scope.spyComm1 = $scope.data.judgment[0];
          $scope.spyComm2 = $scope.data.judgment[0];

          //then create a robot object with the same values
          var newRobotMatch = [];
          newRobotMatch.numLow = $scope.numLow;
          newRobotMatch.numHigh = $scope.numHigh;
          newRobotMatch.lowBarA = $scope.lowBarA;
          newRobotMatch.lowBarT = $scope.lowBarT;
          newRobotMatch.portA = $scope.portA;
          newRobotMatch.portT = $scope.portT;
          newRobotMatch.chevA = $scope.chevA;
          newRobotMatch.chevT = $scope.chevT;
          newRobotMatch.moatA = $scope.moatA;
          newRobotMatch.moatT = $scope.moatT;
          newRobotMatch.rockA = $scope.rockA;
          newRobotMatch.rockT = $scope.rockT;
          newRobotMatch.roughA = $scope.roughA;
          newRobotMatch.roughT = $scope.roughT;
          newRobotMatch.sallyA = $scope.sallyA;
          newRobotMatch.sallyT = $scope.sallyT;
          newRobotMatch.drawA = $scope.drawA;
          newRobotMatch.drawT = $scope.drawT;
          newRobotMatch.scaled = $scope.scaled;
          newRobotMatch.challenge = $scope.challenge;
          newRobotMatch.bFloor = $scope.bFloor;
          newRobotMatch.bSecret = $scope.bSecret;
          newRobotMatch.numF = $scope.numF;
          newRobotMatch.borked = $scope.borked;
          newRobotMatch.defense = $scope.defense;
          newRobotMatch.spyComm1 = $scope.spyComm1;
          newRobotMatch.spyComm2 = $scope.spyComm2;
          
          //and then persist the values to a new data store record
          console.log("Adding new records to RobotMatch with robot ID '" + newRobotMatch.robotId + "' and match ID '" + newRobotMatch.matchId + "'");
          RobotMatch.add(newRobotMatch);
        }
      })
    }
  }
  
  /*
    This function is called when a match number is selected
  */
  $scope.selectMatch = function() {
    $scope.selectRobot();
  }
  
  /*
    This function is called each time a field is updated.
  */
  $scope.robotMatchChanged = function() {
    var editRobotMatch = angular.copy($scope.selectedRobot);
    
    if ($scope.numLow) {
      editRobotMatch.numLow = angular.copy($scope.numLow);
    } else {
      editRobotMatch.numLow = 0;
    }
    if ($scope.numHigh) {
      editRobotMatch.numHigh = angular.copy($scope.numHigh);
    } else {
      editRobotMatch.numHigh = 0;
    }
    if ($scope.lowBarA) {
      editRobotMatch.lowBarA = angular.copy($scope.lowBarA);
    } else {
      editRobotMatch.lowBarA = 0;
    }
    if ($scope.lowBarT) {
      editRobotMatch.lowBarT = angular.copy($scope.lowBarT);
    } else {
      editRobotMatch.lowBarT = 0;
    }
    if ($scope.portA) {
      editRobotMatch.portA = angular.copy($scope.portA);
    } else {
      editRobotMatch.portA = 0;
    }
    if ($scope.portT) {
      editRobotMatch.portT = angular.copy($scope.portT);
    } else {
      editRobotMatch.portT = 0;
    }
    if ($scope.chevA) {
      editRobotMatch.chevA = angular.copy($scope.chevA);
    } else {
      editRobotMatch.chevA = 0;
    }
    if ($scope.chevT) {
      editRobotMatch.chevT = angular.copy($scope.chevT);
    } else {
      editRobotMatch.chevT = 0;
    }
    if ($scope.moatA) {
      editRobotMatch.moatA = angular.copy($scope.moatA);
    } else {
      editRobotMatch.moatA = 0;
    }
    if ($scope.moatT) {
      editRobotMatch.moatT = angular.copy($scope.moatT);
    } else {
      editRobotMatch.moatT = 0;
    }
    if ($scope.rockA) {
      editRobotMatch.rockA = angular.copy($scope.rockA);
    } else {
      editRobotMatch.rockA = 0;
    }
    if ($scope.rockT) {
      editRobotMatch.rockT = angular.copy($scope.rockT);
    } else {
      editRobotMatch.rockT = 0;
    }
    if ($scope.roughA) {
      editRobotMatch.roughA = angular.copy($scope.roughA);
    } else {
      editRobotMatch.roughA = 0;
    }
    if ($scope.roughT) {
      editRobotMatch.roughT = angular.copy($scope.roughT);
    } else {
      editRobotMatch.roughT = 0;
    }
    if ($scope.sallyA) {
      editRobotMatch.sallyA = angular.copy($scope.sallyA);
    } else {
      editRobotMatch.sallyA = 0;
    }
    if ($scope.sallyT) {
      editRobotMatch.sallyT = angular.copy($scope.sallyT);
    } else {
      editRobotMatch.sallyT = 0;
    }
    if ($scope.drawA) {
      editRobotMatch.drawA = angular.copy($scope.drawA);
    } else {
      editRobotMatch.drawA = 0;
    }
    if ($scope.drawT) {
      editRobotMatch.drawT = angular.copy($scope.drawT);
    } else {
      editRobotMatch.drawT = 0;
    }
    if ($scope.scaled) {
      editRobotMatch.scaled = angular.copy($scope.scaled);
    } else {
      editRobotMatch.scaled = 0;
    }
    if ($scope.challenge) {
      editRobotMatch.challenge = angular.copy($scope.challenge);
    } else {
      editRobotMatch.challenge = 0;
    }
    if ($scope.bFloor) {
      editRobotMatch.bFloor = angular.copy($scope.bFloor);
    } else {
      editRobotMatch.bFloor = $scope.data.judgment[0];
    }
    if ($scope.bSecret) {
      editRobotMatch.bSecret = angular.copy($scope.bSecret);
    } else {
      editRobotMatch.bSecret = $scope.data.judgment[0];
    }
    if ($scope.numF) {
      editRobotMatch.numF = angular.copy($scope.numF);
    } else {
      editRobotMatch.numF = 0;
    }
    if ($scope.borked) {
      editRobotMatch.borked = angular.copy($scope.borked);
    } else {
      editRobotMatch.borked = false;
    }
    if ($scope.defense) {
      editRobotMatch.defense = angular.copy($scope.defense);
    } else {
      editRobotMatch.defense = $scope.data.judgment[0];
    }
    if ($scope.spyComm1) {
      editRobotMatch.spyComm1 = angular.copy($scope.spyComm1);
    } else {
      editRobotMatch.spyComm1 = $scope.data.judgment[0];
    }
    if ($scope.spyComm2) {
      editRobotMatch.spyComm2 = angular.copy($scope.spyComm2);
    } else {
      editRobotMatch.spyComm2 = $scope.data.judgment[0];
    }
    
    if ($scope.selectedRobot) {
      editRobotMatch.robotId = angular.copy($scope.selectedRobot.id);
    }
    
    if ($scope.match) {
      editRobotMatch.matchId = angular.copy($scope.match.id);
    }
    
    RobotMatch.update($scope.selectedRobot, editRobotMatch);
  }
});
